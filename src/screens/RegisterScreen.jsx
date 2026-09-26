import React, { useState, useRef } from 'react';
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Phone, ChevronLeft, User, KeyRound, ArrowRight } from 'lucide-react';

export default function RegisterScreen({ onNavigate }) {
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', confirmPassword: '', otp: ['', '', '', ''] });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData((prev) => ({ ...prev, otp: newOtp }));

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const validateStep1 = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Vui lòng nhập họ tên.';
    if (!/^0\d{9}$/.test(formData.phone.replace(/\s/g, ''))) nextErrors.phone = 'SĐT không hợp lệ.';
    if (formData.password.length < 6) nextErrors.password = 'Mật khẩu tối thiểu 6 ký tự.';
    if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = 'Mật khẩu không khớp.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(2); // Simulate sending OTP
      }, 800);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const otpString = formData.otp.join('');
    if (otpString.length < 4) {
      setErrors({ otp: 'Vui lòng nhập đủ 4 số OTP.' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('LOGIN'); // Go to login after registering
    }, 1000);
  };

  return (
    <main className="flex h-full min-h-full flex-col overflow-y-auto bg-white text-[#1A1D1E] relative selection:bg-[#51ce70]/30">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none overflow-hidden flex justify-center z-0">
        <div className="absolute -top-20 right-[-10%] w-80 h-80 bg-[#51ce70]/[0.08] rounded-full blur-[80px]" aria-hidden="true"></div>
        <div className="absolute top-20 -left-10 w-72 h-72 bg-[#2ca849]/[0.05] rounded-full blur-[70px]" aria-hidden="true"></div>
      </div>

      <div className="flex min-h-full flex-1 flex-col px-6 pb-10 pt-[58px] relative z-10">
        <header className="flex items-center justify-between mb-8">
          <button 
            type="button"
            onClick={() => step === 2 ? setStep(1) : onNavigate('LOGIN')}
            className="h-12 w-12 rounded-full border border-[#F0F2F4] flex items-center justify-center text-[#1A1D1E] bg-white/70 backdrop-blur-md shadow-sm transition-transform active:scale-95"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          
          <div className="flex flex-col items-end">
            <span className="text-[14px] font-semibold text-[#8E9397]">Bước {step} / 2</span>
            <div className="flex gap-1.5 mt-1.5">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-6 bg-[#51ce70]' : 'w-2 bg-[#E8ECEF]'}`}></div>
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-6 bg-[#51ce70]' : 'w-2 bg-[#E8ECEF]'}`}></div>
            </div>
          </div>
        </header>

        {step === 1 ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col flex-1">
            <section className="mb-10">
              <h1 className="text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#1A1D1E]">
                Tạo tài khoản<br/>mới
              </h1>
              <p className="mt-3.5 text-[16px] leading-[1.6] text-[#8E9397] font-medium">
                Tham gia cộng đồng xe điện và khám phá hàng ngàn trạm sạc.
              </p>
            </section>

            <form onSubmit={handleNextStep} className="flex flex-col flex-1" noValidate>
              <div className="flex flex-col gap-4">
                {/* Name Input */}
                <div>
                  <div className="group relative flex items-center">
                    <User size={22} strokeWidth={2} className={`pointer-events-none absolute left-5 transition-colors ${errors.name ? 'text-[#FF5C5C]' : 'text-[#A0A5AA] group-focus-within:text-[#51ce70]'}`} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Họ và tên"
                      className={`h-[64px] w-full rounded-[24px] border bg-[#F8F9FA] pl-[52px] pr-5 text-[16px] font-semibold text-[#1A1D1E] outline-none transition-all placeholder:font-medium placeholder:text-[#A0A5AA] focus:bg-white focus:ring-4 ${
                        errors.name ? 'border-[#FF5C5C] focus:border-[#FF5C5C] focus:ring-[#FF5C5C]/15' : 'border-[#F0F2F4] focus:border-[#51ce70] focus:ring-[#51ce70]/15'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="mt-2 px-2 text-[13px] font-semibold text-[#FF5C5C]">{errors.name}</p>}
                </div>

                {/* Phone Input */}
                <div>
                  <div className="group relative flex items-center">
                    <Phone size={22} strokeWidth={2} className={`pointer-events-none absolute left-5 transition-colors ${errors.phone ? 'text-[#FF5C5C]' : 'text-[#A0A5AA] group-focus-within:text-[#51ce70]'}`} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Số điện thoại"
                      className={`h-[64px] w-full rounded-[24px] border bg-[#F8F9FA] pl-[52px] pr-5 text-[16px] font-semibold text-[#1A1D1E] outline-none transition-all placeholder:font-medium placeholder:text-[#A0A5AA] focus:bg-white focus:ring-4 ${
                        errors.phone ? 'border-[#FF5C5C] focus:border-[#FF5C5C] focus:ring-[#FF5C5C]/15' : 'border-[#F0F2F4] focus:border-[#51ce70] focus:ring-[#51ce70]/15'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="mt-2 px-2 text-[13px] font-semibold text-[#FF5C5C]">{errors.phone}</p>}
                </div>

                {/* Password Input */}
                <div>
                  <div className="group relative flex items-center">
                    <LockKeyhole size={22} strokeWidth={2} className={`pointer-events-none absolute left-5 transition-colors ${errors.password ? 'text-[#FF5C5C]' : 'text-[#A0A5AA] group-focus-within:text-[#51ce70]'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                      className={`h-[64px] w-full rounded-[24px] border bg-[#F8F9FA] pl-[52px] pr-[52px] text-[16px] font-semibold text-[#1A1D1E] outline-none transition-all placeholder:font-medium placeholder:text-[#A0A5AA] focus:bg-white focus:ring-4 ${
                        errors.password ? 'border-[#FF5C5C] focus:border-[#FF5C5C] focus:ring-[#FF5C5C]/15' : 'border-[#F0F2F4] focus:border-[#51ce70] focus:ring-[#51ce70]/15'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full text-[#A0A5AA] transition-colors hover:bg-[#E8ECEF]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-2 px-2 text-[13px] font-semibold text-[#FF5C5C]">{errors.password}</p>}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <div className="group relative flex items-center">
                    <LockKeyhole size={22} strokeWidth={2} className={`pointer-events-none absolute left-5 transition-colors ${errors.confirmPassword ? 'text-[#FF5C5C]' : 'text-[#A0A5AA] group-focus-within:text-[#51ce70]'}`} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className={`h-[64px] w-full rounded-[24px] border bg-[#F8F9FA] pl-[52px] pr-[52px] text-[16px] font-semibold text-[#1A1D1E] outline-none transition-all placeholder:font-medium placeholder:text-[#A0A5AA] focus:bg-white focus:ring-4 ${
                        errors.confirmPassword ? 'border-[#FF5C5C] focus:border-[#FF5C5C] focus:ring-[#FF5C5C]/15' : 'border-[#F0F2F4] focus:border-[#51ce70] focus:ring-[#51ce70]/15'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full text-[#A0A5AA] transition-colors hover:bg-[#E8ECEF]"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-2 px-2 text-[13px] font-semibold text-[#FF5C5C]">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="mt-10 mb-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-[64px] w-full items-center justify-between rounded-full bg-[#1A1D1E] px-2 pl-6 text-[18px] font-bold text-white transition-all hover:bg-[#2b3032] active:scale-[0.98] disabled:opacity-70 shadow-[0_8px_20px_rgba(26,29,30,0.15)]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle size={22} className="animate-spin" /> Xử lý...
                    </span>
                  ) : (
                    <span>Tiếp tục</span>
                  )}
                  <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={22} />
                  </div>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col flex-1">
            <section className="mb-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-[#ecf8ef] rounded-[28px] flex items-center justify-center mb-6">
                <KeyRound size={32} strokeWidth={2} className="text-[#51ce70]" />
              </div>
              <h1 className="text-[30px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#1A1D1E]">
                Xác thực Zalo
              </h1>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#8E9397] font-medium max-w-[280px]">
                Mã gồm 4 chữ số đã được gửi qua Zalo đến số <span className="text-[#1A1D1E] font-bold">{formData.phone}</span>
              </p>
            </section>

            <form onSubmit={handleRegister} className="flex flex-col flex-1" noValidate>
              <div className="flex justify-center gap-4 mb-8">
                {formData.otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`w-[64px] h-[72px] rounded-[20px] bg-[#F8F9FA] border text-center text-[28px] font-extrabold text-[#1A1D1E] outline-none transition-all focus:bg-white focus:ring-4 focus:ring-[#51ce70]/15 ${
                      errors.otp ? 'border-[#FF5C5C]' : 'border-[#F0F2F4] focus:border-[#51ce70]'
                    } ${digit ? 'border-[#51ce70] bg-[#f0fbf3]' : ''}`}
                  />
                ))}
              </div>
              
              <div className="text-center mb-10">
                <p className="text-[15px] font-medium text-[#8E9397]">
                  Chưa nhận được mã? <button type="button" className="text-[#51ce70] font-bold hover:underline">Gửi lại</button>
                </p>
              </div>

              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-[64px] w-full items-center justify-center gap-2 rounded-full bg-[#51ce70] px-5 text-[18px] font-bold text-white transition-all hover:bg-[#48c265] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 shadow-[0_8px_20px_rgba(81,206,112,0.25)]"
                >
                  {isLoading && <LoaderCircle size={22} className="animate-spin" />}
                  {isLoading ? 'Đang tạo...' : 'Hoàn tất Đăng ký'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
