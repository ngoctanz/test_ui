import React, { useState } from 'react';
import { Map, ScanLine, User, Home, Wallet, Zap, Navigation, ChevronRight, Search, LocateFixed, MapPin, SlidersHorizontal, Coffee, Wifi, Clock, Settings, Lock, LogOut, Phone, Calendar, Building, Mail, FileDigit } from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isCharging, setIsCharging] = useState(false); // Toggle to see charging state

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] relative">
      
      {/* Content Area */}
      <div className={`flex-1 overflow-y-auto ${activeTab === 'MAP' ? '' : 'pb-[100px]'}`}>
        {activeTab === 'HOME' && <HomeContent isCharging={isCharging} setIsCharging={setIsCharging} />}
        {activeTab === 'MAP' && <MapContent />}
        {activeTab === 'ACCOUNT' && <AccountContent onLogout={() => onNavigate('LOGIN')} />}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full h-[84px] bg-white/90 backdrop-blur-xl border-t border-black/5 flex justify-evenly items-start pt-3 pb-6 z-50">
        <div className="w-[70px] flex justify-center"><NavButton icon={Home} label="Trang chủ" isActive={activeTab === 'HOME'} onClick={() => setActiveTab('HOME')} /></div>
        <div className="w-[70px] flex justify-center"><NavButton icon={Map} label="Bản đồ" isActive={activeTab === 'MAP'} onClick={() => setActiveTab('MAP')} /></div>
        
        {/* Scan Button as a standard tab but highlighted */}
        <div className="w-[70px] flex justify-center">
          <button className="flex flex-col items-center gap-1.5 w-[60px] active:scale-95 transition-transform">
            <div className="w-8 h-8 rounded-full bg-[#1D1D1F] flex items-center justify-center shadow-md">
              <ScanLine size={16} strokeWidth={2.5} className="text-[#51ce70]" />
            </div>
            <span className="text-[10px] font-bold text-[#1D1D1F]">Quét sạc</span>
          </button>
        </div>

        <div className="w-[70px] flex justify-center"><NavButton icon={User} label="Tài khoản" isActive={activeTab === 'ACCOUNT'} onClick={() => setActiveTab('ACCOUNT')} /></div>
      </div>
    </div>
  );
}

function MapContent() {
  return (
    <section className="relative h-full bg-[#eef2f1] animate-in fade-in duration-500">
      {/* Background Map Image */}
      <img
        src="evcharge-map-v1.png"
        alt="Bản đồ trạm sạc"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      
      {/* Top Gradient for Status Bar readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent z-10" />

      {/* Top Floating Controls */}
      <div className="absolute inset-x-0 top-12 z-20 px-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-[52px] flex-1 items-center gap-3 rounded-[20px] bg-white/90 px-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <Search size={20} className="text-[#86868B]" />
            <input 
              type="text" 
              placeholder="Tìm trạm sạc gần bạn..." 
              className="bg-transparent border-none outline-none flex-1 text-[15px] font-semibold text-[#1D1D1F] placeholder:text-[#86868B]"
            />
          </div>
          <button className="w-[52px] h-[52px] rounded-[20px] bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl flex items-center justify-center active:scale-95 transition-transform">
            <SlidersHorizontal size={22} className="text-[#1D1D1F]" />
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          <button className="px-4 py-2 bg-[#1D1D1F] text-white rounded-full text-[13px] font-bold whitespace-nowrap shadow-md">
            Gần nhất
          </button>
          <button className="px-4 py-2 bg-white/90 backdrop-blur-md text-[#1D1D1F] rounded-full text-[13px] font-bold whitespace-nowrap shadow-sm border border-white/50">
            Sạc siêu tốc (DC)
          </button>
          <button className="px-4 py-2 bg-white/90 backdrop-blur-md text-[#1D1D1F] rounded-full text-[13px] font-bold whitespace-nowrap shadow-sm border border-white/50">
            Có dịch vụ
          </button>
        </div>
      </div>

      {/* Pins on the Map */}
      <StationPin className="left-[18%] top-[35%] z-10" />
      <StationPin className="right-[16%] top-[42%] z-10" />
      <StationPin className="left-[27%] top-[60%] z-10" />
      
      {/* Current Location Dot */}
      <div className="absolute left-[47%] top-[50%] h-6 w-6 rounded-full border-[4px] border-white bg-[#007AFF] shadow-[0_4px_16px_rgba(0,122,255,0.4)] z-10">
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-[#007AFF] animate-ping opacity-40"></div>
      </div>
      
      <StationPin className="right-[24%] top-[66%] z-20" featured />

      {/* Locate Me FAB (moved up to avoid bottom sheet) */}
      <button className="absolute right-4 bottom-[290px] w-[48px] h-[48px] rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1D1D1F] z-20 active:scale-95 transition-transform">
        <LocateFixed size={20} strokeWidth={2.5} />
      </button>

      {/* Bottom Sheet for Selected Station */}
      <div className="absolute inset-x-0 bottom-[90px] z-30 bg-white rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.1)] px-6 pt-3 pb-8 transform transition-transform animate-in slide-in-from-bottom-1/2 duration-500">
        {/* Handle */}
        <div className="w-12 h-1.5 bg-[#E5E5EA] rounded-full mx-auto mb-5"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 bg-[#f0fbf3] text-[#51ce70] text-[11px] font-extrabold uppercase tracking-wider rounded-md">Trạm sạc nhanh</span>
              <span className="flex items-center gap-1 text-[12px] font-bold text-[#86868B]"><Clock size={12}/> 24/7</span>
            </div>
            <h2 className="text-[22px] font-extrabold tracking-tight text-[#1D1D1F] leading-none mb-1.5">VinFast Landmark 81</h2>
            <p className="text-[14px] text-[#86868B] font-medium">B3 hầm gửi xe, 720A Điện Biên Phủ</p>
          </div>
          <div className="bg-[#F5F5F7] p-2.5 rounded-2xl flex flex-col items-center justify-center min-w-[64px]">
            <span className="text-[18px] font-black text-[#1D1D1F] leading-none">1.2</span>
            <span className="text-[12px] font-bold text-[#86868B]">Km</span>
          </div>
        </div>

        {/* Availability & Amenities */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-[#f0fbf3] border border-[#51ce70]/20 rounded-[20px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Zap size={16} className="text-[#51ce70]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#86868B] uppercase">Trụ đang rảnh</p>
                <p className="text-[15px] font-black text-[#1D1D1F]">6 / 8 Trụ</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-[20px] px-3.5">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]"><Coffee size={14} strokeWidth={2.5}/></div>
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]"><Wifi size={14} strokeWidth={2.5}/></div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full h-[56px] rounded-[20px] bg-[#1D1D1F] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#2C2C2E] active:scale-[0.98] transition-transform shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <Navigation size={20} strokeWidth={2.5} />
          Dẫn đường tới đây
        </button>
      </div>

    </section>
  );
}

function StationPin({ className, featured = false }) {
  return (
    <button
      type="button"
      aria-label="Xem trạm sạc"
      className={`absolute flex items-center justify-center rounded-full border-[3px] border-white bg-[#51ce70] text-[#17351f] shadow-[0_7px_18px_rgba(38,133,64,0.28)] transition active:scale-90 ${featured ? 'h-14 w-14' : 'h-11 w-11'} ${className}`}
    >
      <Zap size={featured ? 24 : 19} fill="currentColor" strokeWidth={1.8} />
    </button>
  );
}

function NavButton({ icon: Icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 w-[60px]">
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-colors ${isActive ? 'text-[#1D1D1F]' : 'text-[#A0A5AA]'}`} />
      <span className={`text-[10px] font-bold transition-colors ${isActive ? 'text-[#1D1D1F]' : 'text-[#A0A5AA]'}`}>{label}</span>
    </button>
  );
}

function HomeContent() {
  return (
    <div className="animate-in fade-in duration-700">
      
      {/* 1. Header Arc & Car */}
      <div className="relative w-full flex flex-col items-center pt-8 pb-4 overflow-hidden">
        {/* Green arc background */}
        <div className="absolute top-[-260px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#51ce70] rounded-full z-0 shadow-[0_10px_30px_rgba(81,206,112,0.2)]"></div>
        {/* Top bar with Greeting and Avatar */}
        <div className="relative z-10 w-full flex justify-between items-center px-6 pt-2 pb-2">
          <div>
            <p className="text-[13px] text-white/90 font-semibold mb-0.5">Chào buổi sáng,</p>
            <h2 className="text-[20px] font-extrabold tracking-tight text-white">Anh Thư</h2>
          </div>
          <div className="w-[44px] h-[44px] rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden active:scale-95 transition-transform cursor-pointer">
             <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Mia&backgroundColor=f5f5f7" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* The 3D Car */}
        <img 
          src="ev-car-top-v1.png" 
          alt="EV Car" 
          className="relative z-10 w-[230px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)] -mt-4"
        />
        
        {/* Car Name */}
        <div className="relative z-10 mt-6 text-center">
          <p className="text-[15px] text-[#86868B] font-semibold mb-0.5">Xe của bạn</p>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F]">VinFast VF 8</h1>
        </div>
      </div>

      {/* Grid Content Title */}
      <div className="px-6 mt-8 mb-4">
         <h2 className="text-[18px] font-extrabold text-[#1D1D1F] tracking-tight">Tổng quan xe</h2>
      </div>

      {/* 3. Grid Content */}
      <div className="px-6 flex gap-4">
        
        {/* LEFT TALL CARD (Battery) */}
        <div className="flex-1 bg-[#282A2C] rounded-[28px] p-5 flex flex-col items-center justify-between shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
          <div className="w-full text-left mb-6">
            <h3 className="text-white font-bold text-[14px]">Mức Pin</h3>
          </div>
          
          {/* Battery Visual (Vertical) */}
          <div className="relative w-[100%] max-w-[120px] aspect-[4/7] rounded-[32px] border-[5px] border-[#3E4042] bg-[#1A1C1E] overflow-hidden flex flex-col justify-end p-1.5 mb-6 shadow-inner">
            {/* Battery top notch (fake, absolute outside) */}
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[35px] h-[5px] bg-[#3E4042] rounded-t-lg"></div>
            
            {/* Green liquid fill */}
            <div className="w-full h-[78%] bg-gradient-to-b from-[#51ce70] to-[#2BA94A] rounded-[22px] relative flex items-center justify-center shadow-[0_0_20px_rgba(81,206,112,0.5)]">
              {/* Shine effect */}
              <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-[22px]"></div>
            </div>
            
            {/* Floating Text inside the battery */}
            <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-md">
              <span className="text-white font-black text-[38px] tracking-tighter leading-none mb-1">78</span>
              <span className="text-white/90 font-bold text-[13px]">%</span>
            </div>
          </div>
          
          <div className="w-full flex justify-between items-center px-1">
            <span className="text-white/70 text-[13px] font-medium">Trạng thái</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#51ce70]"></div>
              <span className="text-[#51ce70] text-[13px] font-bold">Đang sạc</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN CARDS */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Top Right (Charging Session Info) */}
          <div className="bg-white rounded-[24px] p-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)] border border-[#F0F2F4] flex-1 flex flex-col justify-between">
            <div>
               <h3 className="text-[#86868B] font-medium text-[12px] mb-1">Đã sạc được</h3>
               <div className="flex items-end gap-1">
                 <span className="text-[28px] font-black text-[#1D1D1F] leading-none tracking-tighter">42.5</span>
                 <span className="text-[14px] font-bold text-[#1D1D1F] mb-0.5">kWh</span>
               </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#F0F2F4]">
               <h3 className="text-[#86868B] font-medium text-[12px] mb-1">Thời gian sạc</h3>
               <div className="flex items-end gap-1">
                 <span className="text-[20px] font-black text-[#51ce70] leading-none tracking-tighter">01:24:30</span>
               </div>
            </div>
          </div>

          {/* Bottom Right (Nearest Station) - Redesigned */}
          <div className="bg-white rounded-[24px] p-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)] border border-[#F0F2F4] flex-1 flex flex-col justify-between relative overflow-hidden group active:scale-[0.98] transition-transform cursor-pointer">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#f0fbf3] rounded-full z-0 group-hover:scale-110 transition-transform"></div>
            <Zap size={64} strokeWidth={1} className="absolute -right-2 -bottom-2 text-[#51ce70] opacity-20 z-0" />
            
            <div className="relative z-10">
              <h3 className="text-[#86868B] font-medium text-[12px] mb-1">Trạm gần nhất</h3>
              <h4 className="text-[#1D1D1F] font-bold text-[14px] leading-tight mb-2 truncate">Landmark 81</h4>
              
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full bg-[#f0fbf3] flex items-center justify-center">
                  <MapPin size={12} className="text-[#51ce70]" strokeWidth={3} />
                </div>
                <span className="text-[14px] font-extrabold text-[#1D1D1F] tracking-tight">1.2 km</span>
              </div>
            </div>
            
            <div className="relative z-10 w-full flex justify-between items-center mt-2">
              <span className="text-[11px] font-bold text-[#51ce70]">Còn 6/8 trụ</span>
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] flex items-center justify-center text-white shadow-md">
                <Navigation size={14} strokeWidth={2.5} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Account Balance Card */}
      <div className="px-6 mt-6">
        <div className="bg-[#1D1D1F] rounded-[24px] p-5 shadow-[0_16px_32px_rgba(0,0,0,0.15)] flex justify-between items-center text-white relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform">
           {/* Decor */}
           <div className="absolute right-0 top-0 w-40 h-40 bg-[#51ce70] rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
           <div className="relative z-10">
              <p className="text-white/70 text-[13px] font-medium mb-1 flex items-center gap-1.5"><Wallet size={14} className="text-[#51ce70]" /> Số dư ví EV</p>
              <h3 className="text-[26px] font-extrabold tracking-tight">450,000 đ</h3>
           </div>
           <button className="relative z-10 bg-[#51ce70] text-[#1D1D1F] px-4 py-2.5 rounded-xl text-[14px] font-bold shadow-md hover:bg-[#45b760] transition-colors">
              Nạp tiền
           </button>
        </div>
      </div>

      {/* 4. Stations Around You */}
      <div className="mt-8 px-6 pb-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[18px] font-extrabold text-[#1D1D1F] tracking-tight">Trạm sạc quanh đây</h2>
          <button className="text-[13px] font-bold text-[#51ce70] hover:underline">Xem tất cả</button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Station 1 */}
          <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F0F2F4] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="w-[52px] h-[52px] rounded-full bg-[#f0fbf3] flex items-center justify-center shrink-0">
              <Zap size={24} className="text-[#51ce70]" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[15px] font-bold text-[#1D1D1F] truncate mb-0.5">Vincom Mega Mall Thảo Điền</h4>
              <p className="text-[13px] text-[#86868B] truncate font-medium">161 Xa Lộ Hà Nội, P. Thảo Điền</p>
            </div>
            <div className="text-right shrink-0">
              <span className="block text-[14px] font-extrabold text-[#1D1D1F]">2.5 km</span>
              <span className="text-[11px] font-bold text-[#51ce70]">Trống 4/10</span>
            </div>
          </div>

          {/* Station 2 */}
          <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F0F2F4] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="w-[52px] h-[52px] rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0">
              <Zap size={24} className="text-[#86868B]" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[15px] font-bold text-[#1D1D1F] truncate mb-0.5">Pearl Plaza</h4>
              <p className="text-[13px] text-[#86868B] truncate font-medium">561A Điện Biên Phủ, P.25</p>
            </div>
            <div className="text-right shrink-0">
              <span className="block text-[14px] font-extrabold text-[#1D1D1F]">3.8 km</span>
              <span className="text-[11px] font-bold text-[#FF3B30]">Đã đầy</span>
            </div>
          </div>
          
          {/* Station 3 */}
          <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F0F2F4] flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="w-[52px] h-[52px] rounded-full bg-[#f0fbf3] flex items-center justify-center shrink-0">
              <Zap size={24} className="text-[#51ce70]" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[15px] font-bold text-[#1D1D1F] truncate mb-0.5">Estella Place</h4>
              <p className="text-[13px] text-[#86868B] truncate font-medium">88 Song Hành, P. An Phú</p>
            </div>
            <div className="text-right shrink-0">
              <span className="block text-[14px] font-extrabold text-[#1D1D1F]">4.1 km</span>
              <span className="text-[11px] font-bold text-[#51ce70]">Trống 2/6</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function AccountContent({ onLogout }) {
  return (
    <div className="animate-in fade-in duration-500 pb-8">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 bg-white rounded-b-[40px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] mb-6">
        <h1 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-6">Tài khoản</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full bg-[#f5f5f7] flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
             <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Mia&backgroundColor=f5f5f7" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-[20px] font-extrabold text-[#1D1D1F] mb-0.5">Anh Thư</h2>
            <p className="text-[14px] text-[#86868B] font-medium flex items-center gap-1.5">
              <Phone size={14} /> 090 123 4567
            </p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#f0fbf3] flex items-center justify-center text-[#51ce70] shadow-sm active:scale-95 transition-transform">
             <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 flex flex-col gap-6">
        
        {/* User Info Group */}
        <div>
          <h3 className="text-[13px] font-bold text-[#86868B] uppercase tracking-wider mb-3 px-2">Thông tin cá nhân</h3>
          <div className="bg-white rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F0F2F4] overflow-hidden">
            <SettingRow icon={Calendar} label="Ngày sinh" value="15/08/1995" />
            <div className="h-px bg-[#F0F2F4] ml-[64px]" />
            <SettingRow icon={MapPin} label="Địa chỉ" value="Quận 2, TP. Hồ Chí Minh" />
          </div>
        </div>

        {/* Invoice Group */}
        <div>
           <h3 className="text-[13px] font-bold text-[#86868B] uppercase tracking-wider mb-3 px-2">Cấu hình hóa đơn VAT</h3>
           <div className="bg-white rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F0F2F4] overflow-hidden">
              <SettingRow icon={Building} label="Tên công ty" value="Công ty TNHH EV Tech" />
              <div className="h-px bg-[#F0F2F4] ml-[64px]" />
              <SettingRow icon={FileDigit} label="Mã số thuế" value="0312345678" />
              <div className="h-px bg-[#F0F2F4] ml-[64px]" />
              <SettingRow icon={MapPin} label="Địa chỉ" value="Khu CNC, TP. Thủ Đức" />
              <div className="h-px bg-[#F0F2F4] ml-[64px]" />
              <SettingRow icon={Mail} label="Email nhận HĐ" value="accounting@evtech.vn" />
           </div>
        </div>

        {/* Security Group */}
        <div>
           <h3 className="text-[13px] font-bold text-[#86868B] uppercase tracking-wider mb-3 px-2">Bảo mật</h3>
           <div className="bg-white rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F0F2F4] overflow-hidden">
              <SettingRow icon={Lock} label="Đổi mật khẩu" action />
           </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="mt-4 flex items-center justify-center gap-2 w-full h-[56px] rounded-[20px] bg-[#FFF0F0] text-[#FF3B30] font-bold text-[16px] active:scale-[0.98] transition-transform"
        >
          <LogOut size={20} strokeWidth={2.5} />
          Đăng xuất tài khoản
        </button>

      </div>
    </div>
  )
}

function SettingRow({ icon: Icon, label, value, action }) {
  return (
    <div className="flex items-center px-4 py-4 active:bg-[#F5F5F7] transition-colors cursor-pointer group">
      <div className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1D1D1F] mr-3 group-hover:bg-[#51ce70] group-hover:text-white transition-colors">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div className="flex-1 flex justify-between items-center pr-2">
         <span className="text-[15px] font-semibold text-[#1D1D1F]">{label}</span>
         {value && <span className="text-[14px] font-medium text-[#86868B] truncate max-w-[150px]">{value}</span>}
         {action && <ChevronRight size={18} className="text-[#A0A5AA]" />}
      </div>
    </div>
  );
}
