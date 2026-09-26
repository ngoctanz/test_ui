import React, { useState, useRef } from 'react';
import { LoaderCircle, Phone, ChevronLeft, LockKeyhole, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ForgotPasswordScreen({ onNavigate }) {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Pass
  const [formData, setFormData] = useState({ phone: '', otp: ['', '', '', ''], newPassword: '', confirmPassword: '' });
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

    if (value && index < 3) otpRefs[index + 1].current?.focus();
    
    // Auto submit if all 4 are filled
    if (index === 3 && value && newOtp.every(v => v !== '')) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!/^0\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      setErrors({ phone: 'Số điện thoại không hợp lệ.' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerifyOtp = (otpString) => {
    const currentOtp = otpString || formData.otp.join('');
    if (currentOtp.length < 4) {
      setErrors({ otp: 'Vui lòng nhập đủ 4 số.' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 800);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (formData.newPassword.length < 6) nextErrors.password = 'Mật khẩu tối thiểu 6 ký tự.';
    if (formData.newPassword !== formData.confirmPassword) nextErrors.confirmPassword = 'Mật khẩu không khớp.';
    
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('LOGIN');
    }, 1000);
  };

  return (
    <main className="flex h-full min-h-full flex-col overflow-y-auto bg-white text-[#1D1D1F] relative selection:bg-[#51ce70]/30">
      {/* Decorative ambient background - Unified green style */}
      <div className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none overflow-hidden flex justify-center z-0">
        <div className="absolute -top-32 right-[-20%] w-[400px] h-[400px] bg-[#51ce70]/[0.06] rounded-full blur-[80px]" aria-hidden="true"></div>
      </div>

      <div className="flex min-h-full flex-1 flex-col px-6 pb-10 pt-[58px] relative z-10">
        <header className="flex items-center justify-between mb-8">
          <button 
            type="button"
            onClick={() => step > 1 ? setStep(step - 1) : onNavigate('LOGIN')}
            className="h-12 w-12 rounded-full border border-transparent bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] transition-all hover:bg-[#E5E5EA] active:scale-95"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          
          <div className="flex flex-col items-end">
            <span className="text-[13px] font-semibold text-[#86868B] uppercase tracking-wider">Bước {step}/3</span>
            <div className="flex gap-1 mt-2">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'w-5 bg-[#1D1D1F]' : 'w-2 bg-[#E5E5EA]'}`}></div>
              <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'w-5 bg-[#1D1D1F]' : 'w-2 bg-[#E5E5EA]'}`}></div>
              <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 3 ? 'w-5 bg-[#51ce70]' : 'w-2 bg-[#E5E5EA]'}`}></div>
            </div>
          </div>
        </header>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col flex-1 fill-mode-both">
            <section className="mb-10">
              <h1 className="text-[36px] font-extrabold leading-[1.15] tracking-tight text-[#1D1D1F]">
                Quên<br/>Mật khẩu?
              </h1>
              <p className="mt-3.5 text-[16px] leading-[1.5] text-[#86868B] font-medium">
                Đừng lo lắng! Nhập số điện thoại của bạn, chúng tôi sẽ gửi mã OTP để đặt lại.
              </p>
            </section>

            <form onSubmit={handleSendOtp} className="flex flex-col flex-1" noValidate>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="group relative flex items-center">
                    <Phone size={22} strokeWidth={2} className={`pointer-events-none absolute left-5 transition-colors ${errors.phone ? 'text-[#FF3B30]' : 'text-[#86868B] group-focus-within:text-[#1D1D1F]'}`} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Số điện thoại của bạn"
                      className={`h-[64px] w-full rounded-[24px] border bg-[#F5F5F7] pl-[52px] pr-5 text-[17px] font-semibold text-[#1D1D1F] outline-none transition-all placeholder:font-medium placeholder:text-[#86868B] focus:bg-white focus:ring-[3px] ${
                        errors.phone ? 'border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-transparent focus:border-[#1D1D1F] focus:ring-[#1D1D1F]/10'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="mt-2 px-2 text-[13px] font-semibold text-[#FF3B30]">{errors.phone}</p>}
                </div>
              </div>

              <div className="mt-auto pt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-[60px] w-full items-center justify-between rounded-full bg-[#1D1D1F] px-2 pl-6 text-[18px] font-bold text-white transition-all hover:bg-[#2C2C2E] active:scale-[0.98] disabled:opacity-70 shadow-md"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle size={22} className="animate-spin" /> Xử lý...
                    </span>
                  ) : (
                    <span>Tiếp tục</span>
                  )}
                  <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={22} />
                  </div>
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col flex-1 fill-mode-both">
            <section className="mb-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-[#F5F5F7] rounded-[28px] flex items-center justify-center mb-6">
                <ShieldCheck size={36} strokeWidth={1.5} className="text-[#1D1D1F]" />
              </div>
              <h1 className="text-[32px] font-extrabold leading-[1.2] tracking-tight text-[#1D1D1F]">
                Xác thực
              </h1>
              <p className="mt-3 text-[16px] leading-[1.5] text-[#86868B] font-medium max-w-[280px]">
                Nhập mã OTP 4 số được gửi tới <br/><span className="text-[#1D1D1F] font-bold text-[17px]">{formData.phone}</span>
              </p>
            </section>

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
                  className={`w-[64px] h-[72px] rounded-[20px] bg-[#F5F5F7] border-2 text-center text-[28px] font-bold text-[#1D1D1F] outline-none transition-all focus:bg-white focus:border-[#1D1D1F] focus:shadow-[0_4px_14px_rgba(0,0,0,0.05)] ${
                    errors.otp ? 'border-[#FF3B30]' : 'border-transparent'
                  } ${digit ? 'border-[#1D1D1F] bg-white' : ''}`}
                />
              ))}
            </div>
            {errors.otp && <p className="text-center text-[14px] font-semibold text-[#FF3B30] mb-4">{errors.otp}</p>}
            
            <div className="text-center mb-10">
              <p className="text-[15px] font-medium text-[#86868B]">
                Chưa nhận được mã? <button type="button" className="text-[#1D1D1F] font-bold hover:underline">Gửi lại</button>
              </p>
            </div>

            <div className="mt-auto">
              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={isLoading}
                className="group flex h-[60px] w-full items-center justify-between rounded-full bg-[#1D1D1F] px-2 pl-6 text-[18px] font-bold text-white transition-all hover:bg-[#2C2C2E] active:scale-[0.98] disabled:opacity-70 shadow-md"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle size={22} className="animate-spin" /> Xác minh...
                  </span>
                ) : (
                  <span>Xác nhận</span>
                )}
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={22} />
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col flex-1 fill-mode-both">
            <section className="mb-10 text-center flex flex-col items-center">
               <div className="w-20 h-20 bg-[#f0fbf3] rounded-[28px] flex items-center justify-center mb-6">
                <LockKeyhole size={36} strokeWidth={1.5} className="text-[#51ce70]" />
              </div>
              <h1 className="text-[32px] font-extrabold leading-[1.2] tracking-tight text-[#1D1D1F]">
                Mật khẩu mới
              </h1>
              <p className="mt-3 text-[16px] leading-[1.5] text-[#86868B] font-medium max-w-[280px]">
                Vui lòng tạo một mật khẩu mới đủ mạnh để bảo vệ tài khoản của bạn.
              </p>
            </section>

            <form onSubmit={handleResetPassword} className="flex flex-col flex-1" noValidate>
              <div className="mb-8 flex flex-col gap-4">
                <div>
                  <div className="group relative flex items-center">
                    <LockKeyhole size={22} strokeWidth={2} className={`pointer-events-none absolute left-5 transition-colors ${errors.password ? 'text-[#FF3B30]' : 'text-[#86868B] group-focus-within:text-[#51ce70]'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => handleChange('newPassword', e.target.value)}
                      placeholder="Nhập mật khẩu mới"
                      className={`h-[64px] w-full rounded-[24px] border bg-[#F5F5F7] pl-[52px] pr-[52px] text-[17px] font-semibold text-[#1D1D1F] outline-none transition-all placeholder:font-medium placeholder:text-[#86868B] focus:bg-white focus:ring-[3px] ${
                        errors.password ? 'border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-transparent focus:border-[#51ce70] focus:ring-[#51ce70]/10'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full text-[#86868B] transition-colors hover:bg-[#E5E5EA]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-2 px-2 text-[13px] font-semibold text-[#FF3B30]">{errors.password}</p>}
                </div>

                <div>
                  <div className="group relative flex items-center">
                    <LockKeyhole size={22} strokeWidth={2} className={`pointer-events-none absolute left-5 transition-colors ${errors.confirmPassword ? 'text-[#FF3B30]' : 'text-[#86868B] group-focus-within:text-[#51ce70]'}`} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className={`h-[64px] w-full rounded-[24px] border bg-[#F5F5F7] pl-[52px] pr-[52px] text-[17px] font-semibold text-[#1D1D1F] outline-none transition-all placeholder:font-medium placeholder:text-[#86868B] focus:bg-white focus:ring-[3px] ${
                        errors.confirmPassword ? 'border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20' : 'border-transparent focus:border-[#51ce70] focus:ring-[#51ce70]/10'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full text-[#86868B] transition-colors hover:bg-[#E5E5EA]"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-2 px-2 text-[13px] font-semibold text-[#FF3B30]">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-[60px] w-full items-center justify-center gap-2 rounded-full bg-[#51ce70] px-5 text-[18px] font-bold text-white transition-all hover:bg-[#48c265] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 shadow-[0_4px_14px_rgba(81,206,112,0.3)]"
                >
                  {isLoading && <LoaderCircle size={22} className="animate-spin" />}
                  {isLoading ? 'Đang cập nhật...' : 'Hoàn tất cập nhật'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
