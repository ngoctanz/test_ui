import React, { useState } from 'react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('LOGIN')
  const usesDarkHeader = currentScreen === 'LOGIN' || currentScreen === 'HOME'

  const renderScreen = () => {
    switch(currentScreen) {
      case 'LOGIN':
        return <LoginScreen onNavigate={setCurrentScreen} />
      case 'HOME':
        return <HomeScreen onNavigate={setCurrentScreen} />
      case 'REGISTER':
        return <RegisterScreen onNavigate={setCurrentScreen} />
      case 'FORGOT_PASSWORD':
        return <ForgotPasswordScreen onNavigate={setCurrentScreen} />
      default:
        return <LoginScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="w-full h-full relative bg-white overflow-hidden flex flex-col">
      {/* Global Status Bar */}
      <div className="absolute top-0 inset-x-0 flex justify-between items-center px-6 pt-3 pb-2 z-50 pointer-events-none">
        <div className={`font-semibold text-[15px] tracking-tight ${usesDarkHeader ? 'text-white' : 'text-zinc-900'}`}>09:41</div>
        <div className={`flex items-center gap-1.5 ${usesDarkHeader ? 'text-white' : 'text-zinc-900'}`} aria-hidden="true">
          <Signal size={16} strokeWidth={2.4} />
          <Wifi size={16} strokeWidth={2.4} />
          <BatteryFull size={21} strokeWidth={2.2} />
        </div>
      </div>

      <div className="flex-1 w-full h-full overflow-hidden">
        {renderScreen()}
      </div>

      {/* Global Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] rounded-full z-50 pointer-events-none bg-zinc-900"></div>
    </div>
  )
}

export default App
