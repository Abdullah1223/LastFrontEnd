import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { CreateAccountForm } from './CreateAccountForm';
import { PasswordRecoveryForm } from './PasswordRecoveryForm';
import { Logo } from '../Logo';
import { useUser } from '../../context/UserContext';

type AuthView = 'login' | 'create' | 'recovery';

export function AuthPage() {
  const [view, setView] = useState<AuthView>('login');
  const { setUser } = useUser();

  const handleLogoClick = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      role: 'fan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      handle: '@guest',
      bio: 'Music Enthusiast',
      followers: 0,
      following: false,
      permissions: {
        canJudge: false,
        canSubmit: false,
        canVote: true,
        canDonate: true,
        canModerate: false
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <button 
        onClick={handleLogoClick}
        className="mb-8 transform hover:scale-105 transition-transform"
      >
        <Logo />
      </button>
      
      {view === 'login' && (
        <LoginForm 
          onSwitchToCreate={() => setView('create')}
          onForgotPassword={() => setView('recovery')}
        />
      )}
      {view === 'create' && (
        <CreateAccountForm setView={setView} onSwitchToLogin={() => setView('login')} />
      )}
      {view === 'recovery' && (
        <PasswordRecoveryForm onBack={() => setView('login')} />
      )}
    </div>
  );
}