'use client'

import { AuthContext } from '@/app/Authentication/Proividers/AuthProviders';
import React, { useContext } from 'react';

export default function Profile() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F60301' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="spinner"></div>
                </div>
                <style jsx>{`
                    .spinner {
                        width: 50px;
                        height: 50px;
                        border: 6px solid #f3f3f3; 
                        border-top: 6px solid #0370F7; 
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#002540' }}>
            <div style={{ border: '1px solid #0370F7', borderRadius: '8px', padding: '20px', width: '300px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', backgroundColor: '#000000', color: '#FFFFFF' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img
                        src={user.photoURL || '/default-avatar.png'}
                        alt={user.displayName || 'User Profile'}
                        style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #F60301' }}
                    />
                </div>
                <h2 style={{ textAlign: 'center', color: '#0370F7' }}>{user.
displayName || 'No Name Provided'}</h2>
                <p style={{ textAlign: 'center', color: '#F60301' }}>{user.email}</p>
                
                <hr style={{ margin: '20px 0', borderColor: '#0370F7' }} />
                <p style={{ textAlign: 'center', color: '#999' }}>
                    Last Login: {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'Unknown'}
                </p>
                <p style={{ textAlign: 'center', color: '#999' }}>
                    Last Logout: {user.metadata?.lastLogoutTime ? new Date(user.metadata.lastLogoutTime).toLocaleString() : 'Unknown'}
                </p>
            </div>
        </div>
    );
}
