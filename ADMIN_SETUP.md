# User Approval System - Setup Instructions

## Overview

Ab aapke application mein admin approval system implement ho gaya hai. Koi bhi naya user login karega to usko admin ka approval chahiye hoga landing pages create karne ke liye.

## Database Migration

### Step 1: Run the migration

Supabase Dashboard mein jao aur yeh SQL run karo:

```sql
-- File path: supabase/migrations/20251109000001_add_user_approval_system.sql
```

SQL Editor mein jao (https://supabase.com/dashboard) aur poori file ka content paste karke execute karo.

## First Admin Setup

### Step 2: Create First Admin User

Pehle apne application mein signup/login karo with your email.

Phir Supabase Dashboard → SQL Editor mein jao aur yeh query run karo (apna email replace karo):

```sql
-- Replace 'your-admin-email@example.com' with your actual email
INSERT INTO public.admin_users (user_id, email)
SELECT id, email
FROM auth.users
WHERE email = 'shwetchourey0@gmail.com';
```

Example:

```sql
INSERT INTO public.admin_users (user_id, email)
SELECT id, email
FROM auth.users
WHERE email ="";
```

### Step 3: Approve Yourself (if needed)

Agar aapka account already pending approval mein hai:

```sql
UPDATE public.user_approvals
SET status = 'approved',
    approved_at = NOW()
WHERE email = 'your-admin-email@example.com';
```

## Features

### For Regular Users:

1. ✅ User signup karta hai
2. ⏳ Automatically approval request create hoti hai (status: pending)
3. 🚫 User landing pages create nahi kar sakta until approved
4. ✅ Dashboard pe warning dikhega: "Approval Pending"
5. ✅ Create button disabled rahega

### For Admin Users:

1. 🛡️ Admin Panel access mil jayega
2. 📊 Dashboard pe "Admin Panel" button dikhega
3. 👥 Sab pending approval requests dikhengi
4. ✅ Approve/Reject kar sakte hain with reason
5. 📈 Stats dikhenge: Pending, Approved, Rejected counts

## Admin Dashboard Features

Navigate to: `/admin` (only admins can access)

### Stats Cards:

- ⏳ **Pending Requests**: Kitne users approval ke liye wait kar rahe hain
- ✅ **Approved Users**: Total approved users
- ❌ **Rejected Users**: Total rejected users

### Actions Table:

- 📧 User email
- 🏷️ Status badge (Pending/Approved/Rejected)
- 📅 Request date/time
- ✅ Approve button (green)
- ❌ Reject button (red) - with reason dialog

## Security Features

✅ **RLS Policies**:

- Admins can see all approval requests
- Users can only see their own approval status
- Only admins can approve/reject users
- Only approved users can create/edit/delete landing pages

✅ **Functions**:

- `is_admin(user_uuid)` - Check if user is admin
- `is_approved(user_uuid)` - Check if user is approved
- `handle_new_user()` - Auto-create approval request on signup

✅ **Triggers**:

- Automatic approval request creation on new user signup

## Testing

### Test Regular User Flow:

1. Create new account with different email
2. Check Dashboard - should show "Approval Pending" alert
3. Try to click "Create New" - button should be disabled
4. Login as admin
5. Go to `/admin`
6. Approve the user
7. Logout and login as that user again
8. Now user can create landing pages

### Test Admin Flow:

1. Login as admin
2. Go to `/admin`
3. See all pending approvals
4. Click Approve or Reject
5. For reject, add reason in dialog
6. Check stats update automatically

## Real-time Updates

🔄 User approval status updates in real-time using Supabase Realtime subscriptions.

Jab admin approve karega, user ko turant access mil jayega (page refresh nahi karna padega).

## Adding More Admins

Kisi aur user ko admin banana ho:

```sql
-- Get user_id from auth.users table
INSERT INTO public.admin_users (user_id, email)
SELECT id, email
FROM auth.users
WHERE email = 'new-admin@example.com';
```

## Troubleshooting

### User can't create pages even after approval:

```sql
-- Check approval status
SELECT * FROM public.user_approvals WHERE email = 'user@example.com';

-- Manually approve if needed
UPDATE public.user_approvals
SET status = 'approved', approved_at = NOW()
WHERE email = 'user@example.com';
```

### Admin access not working:

```sql
-- Check admin status
SELECT * FROM public.admin_users WHERE email = 'admin@example.com';

-- Add admin if missing
INSERT INTO public.admin_users (user_id, email)
SELECT id, email FROM auth.users WHERE email = 'admin@example.com';
```

### Check all policies:

```sql
-- View all RLS policies
SELECT * FROM pg_policies WHERE tablename IN ('admin_users', 'user_approvals', 'landing_pages');
```

## Notes

- 🔒 First admin ko manually SQL se banana padega (security ke liye)
- 📧 Baad mein admin dashboard se more admins add kar sakte ho
- 🔄 Real-time updates automatically work
- 🎯 Admins ko approval nahi chahiye, directly access mil jata hai
- ⚡ Automatic approval request creation on signup via trigger

Happy Managing! 🚀
