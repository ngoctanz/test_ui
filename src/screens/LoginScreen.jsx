import React, { useState } from 'react';
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Phone, ArrowRight } from 'lucide-react';

export default function LoginScreen({ onNavigate }) {
  const [phone, setPhone] = useState('0912 345 678');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!/^0\d{9}$/.test(phone.replace(/\s/g, ''))) nextErrors.phone = 'Kiểm tra lại số điện thoại.';
    if (!password) nextErrors.password = 'Nhập mật khẩu để tiếp tục.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      onNavigate('HOME');
    }, 800);
  };

  return (
    <main className="relative flex h-full min-h-full flex-col overflow-y-auto bg-[#111612] text-[#1d1d1f]">
      <section className="relative flex h-[34%] min-h-[270px] w-full shrink-0 flex-col justify-end overflow-hidden px-7 pb-8 pt-14">
        <img
          src="login-hero-v3.png"
          alt="Xe điện đang sạc tại trạm"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,16,11,0.2)_0%,rgba(5,16,11,0.02)_40%,rgba(5,16,11,0.88)_100%)]" aria-hidden="true" />

        <div className="relative z-10 flex items-center gap-3.5">
          <img
            src="evcharge-logo-v5.png"
            alt=""
            className="h-[52px] w-[76px] shrink-0 object-contain"
          />
          <div className="min-w-0">
            <h1 className="text-[31px] font-extrabold leading-none tracking-[-0.04em] text-white">
              EVCharge
            </h1>
            <p className="mt-2 text-[14px] font-medium text-white/76">
              Năng lượng cho mọi hành trình.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-1 flex flex-1 flex-col rounded-t-[34px] bg-white px-7 pb-6 pt-9 shadow-[0_-12px_36px_rgba(5,20,12,0.18)]">
        <div className="absolute left-1/2 top-3 h-1.5 w-11 -translate-x-1/2 rounded-full bg-[#dedfe2]" aria-hidden="true" />

        <h2 className="text-[23px] font-extrabold tracking-[-0.025em] text-[#1d1d1f]">
          Bắt đầu ngay
        </h2>
        <p className="mt-1 text-[14px] leading-5 text-[#77797e]">
          Vui lòng đăng nhập để tiếp tục.
        </p>

        <form onSubmit={handleLogin} className="flex flex-1 flex-col mt-8" noValidate>
          <div className="flex flex-col gap-3.5">
            <div>
              <label htmlFor="login-phone" className="sr-only">Số điện thoại</label>
              <div className="group relative flex items-center">
                <Phone
                  size={21}
                  strokeWidth={2.1}
                  className={`pointer-events-none absolute left-4 transition-colors ${errors.phone ? 'text-[#d94a43]' : 'text-[#a2a5aa] group-focus-within:text-[#1d1d1f]'}`}
                  aria-hidden="true"
                />
                <input
                  id="login-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    clearError('phone');
                  }}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  placeholder="Số điện thoại"
                  className={`h-[56px] w-full rounded-[18px] border bg-[#f3f3f5] pl-12 pr-4 text-[16px] font-bold text-[#1d1d1f] outline-none transition placeholder:font-medium placeholder:text-[#a2a5aa] focus:bg-white focus:ring-4 ${
                    errors.phone
                      ? 'border-[#d94a43] focus:ring-[#d94a43]/10'
                      : 'border-transparent hover:border-[#e1e1e4] focus:border-[#1d1d1f] focus:ring-[#1d1d1f]/8'
                  }`}
                />
              </div>
              {errors.phone && <p id="phone-error" role="alert" className="mt-1.5 px-1 text-[12px] font-semibold text-[#bc3f39]">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className="sr-only">Mật khẩu</label>
              <div className="group relative flex items-center">
                <LockKeyhole
                  size={21}
                  strokeWidth={2.1}
                  className={`pointer-events-none absolute left-4 transition-colors ${errors.password ? 'text-[#d94a43]' : 'text-[#a2a5aa] group-focus-within:text-[#1d1d1f]'}`}
                  aria-hidden="true"
                />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearError('password');
                  }}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  placeholder="Mật khẩu"
                  className={`h-[56px] w-full rounded-[18px] border bg-[#f3f3f5] pl-12 pr-14 text-[16px] font-bold text-[#1d1d1f] outline-none transition placeholder:font-medium placeholder:text-[#a2a5aa] focus:bg-white focus:ring-4 ${
                    errors.password
                      ? 'border-[#d94a43] focus:ring-[#d94a43]/10'
                      : 'border-transparent hover:border-[#e1e1e4] focus:border-[#1d1d1f] focus:ring-[#1d1d1f]/8'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-1.5 flex h-11 w-11 items-center justify-center rounded-full text-[#9a9da2] transition hover:bg-[#e5e5e8] hover:text-[#1d1d1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d1d1f]"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff size={19} strokeWidth={2.1} /> : <Eye size={19} strokeWidth={2.1} />}
                </button>
              </div>
              {errors.password && <p id="password-error" role="alert" className="mt-1.5 px-1 text-[12px] font-semibold text-[#bc3f39]">{errors.password}</p>}
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button type="button" onClick={() => onNavigate('FORGOT_PASSWORD')} className="min-h-11 rounded-xl px-1 text-[13px] font-semibold text-[#7d7f84] transition hover:bg-[#f3f3f5] hover:text-[#1d1d1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d1d1f]">
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group mt-4 flex h-[62px] w-full items-center justify-between rounded-full bg-[#1d1d1f] py-1.5 pl-6 pr-1.5 text-[17px] font-extrabold text-white shadow-[0_12px_24px_rgba(20,22,20,0.16)] transition hover:bg-[#29292c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1d1d1f]/18 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
          >
            <span className="flex items-center gap-2">
              {isLoading && <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />}
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </span>
            <span className="flex h-[49px] w-[49px] items-center justify-center rounded-full bg-[#58d875] text-[#17351f] transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <ArrowRight size={21} strokeWidth={2.5} />
            </span>
          </button>

          <div className="mt-auto pt-8 pb-6 flex items-center justify-center gap-1.5">
            <span className="text-[14px] text-[#7d7f84] font-medium">Chưa có tài khoản?</span>
            <button type="button" onClick={() => onNavigate('REGISTER')} className="text-[14px] font-bold text-[#25984a] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c969] rounded-md px-1 py-0.5">
              Đăng ký ngay
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
