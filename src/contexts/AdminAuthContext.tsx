
import React from 'react';
// This file is deprecated in favor of src/contexts/auth/AdminAuthContext.tsx
// Providing a re-export to maintain backward compatibility

import { AdminAuthProvider, useAdminAuth } from './auth/AdminAuthContext';

export { AdminAuthProvider, useAdminAuth };
export default { AdminAuthProvider, useAdminAuth };
