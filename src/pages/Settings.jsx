import React from 'react';
import Esidebar from '../components/Esidebar';

const Settings = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ }}>
        <Esidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px' }}>Settings</h2>

          {/* Profile Info Section */}
          <div style={{ marginBottom: '30px' }}>
            <h4>Profile Information</h4>
            <label style={{ display: 'block', marginTop: '10px' }}>Full Name</label>
            <input type="text" value="John Doe" style={{ width: '100%', padding: '8px' }} />

            <label style={{ display: 'block', marginTop: '10px' }}>Email</label>
            <input type="email" value="john.doe@example.com" style={{ width: '100%', padding: '8px' }} />
          </div>

          {/* Notification Preferences */}
          <div style={{ marginBottom: '30px' }}>
            <h4>Notification Preferences</h4>
            <label style={{ display: 'block', marginTop: '10px' }}>
              <input type="checkbox" defaultChecked style={{ marginRight: '8px' }} />
              Email me about job matches
            </label>
            <label style={{ display: 'block', marginTop: '10px' }}>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Notify me about account activity
            </label>
            <label style={{ display: 'block', marginTop: '10px' }}>
              <input type="checkbox" defaultChecked style={{ marginRight: '8px' }} />
              Send weekly newsletters
            </label>
          </div>

          {/* Security */}
          <div style={{ marginBottom: '30px' }}>
            <h4>Security</h4>
            <label style={{ display: 'block', marginTop: '10px' }}>Current Password</label>
            <input type="password" placeholder="Enter current password" style={{ width: '100%', padding: '8px' }} />

            <label style={{ display: 'block', marginTop: '10px' }}>New Password</label>
            <input type="password" placeholder="Enter new password" style={{ width: '100%', padding: '8px' }} />

            <label style={{ display: 'block', marginTop: '10px' }}>Confirm New Password</label>
            <input type="password" placeholder="Re-enter new password" style={{ width: '100%', padding: '8px' }} />
          </div>

          {/* Danger Zone */}
          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff3f3', border: '1px solid #ffcccc', borderRadius: '8px' }}>
            <h4 style={{ color: '#cc0000' }}>Danger Zone</h4>
            <p style={{ marginTop: '10px' }}>Deleting your account is permanent and cannot be undone.</p>
            <button style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
