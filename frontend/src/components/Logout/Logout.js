import React from 'react';

export default function Logout() {
    fetch('/logout', { method: 'POST' });
    window.location.replace('/');
    return <div></div>;
}
