# SwimSure website

A one-page website for SwimSure ("A swim school inside your society's pool"), built from the Demo Day pitch deck.

**Live:** https://swimsure.vercel.app

**How it works:** form → saved in Supabase → confirmation email to the person + alert email to SwimSure. Every push to `main` on GitHub republishes the site on Vercel.

**What it does**

- Short landing page: photo hero, how it works, price, societies, FAQ and the form. Sticky "Book free demo" bar on phones.
- **Society earnings calculator**: drag a slider to see what 15% of fees earns the society.
- **Enquiry form** with three tabs (Parent / Society / Coach). Each enquiry:
  1. is **saved in Supabase** (table `enquiries`),
  2. sends **you an email alert** with all the details (hit Reply to answer them),
  3. sends the person an **automatic reply**, written differently for parents, societies and coaches.
- Optional "Chat on WhatsApp" button.

Until Supabase is connected, the form runs in **demo mode**: it shows the thank-you message but saves nothing.

## Run it on your Mac

```bash
cd "/Users/vion/Desktop/ai hackthon /swimsure"
npm run dev
```

Open http://localhost:3100

## Setup (do once)

### 1. Supabase (saves enquiries)

1. Go to https://supabase.com/dashboard and click **New project**. Name it `swimsure`.
   (The free plan allows 2 active projects. If it says you've hit the limit, use your MeenuBazaar project instead; the table name doesn't clash.)
2. Open **SQL Editor**, paste all of `supabase/schema.sql` and click **Run**.
3. Click **Connect** (or Project Settings → API). Copy the **Project URL** and the **anon / publishable key**.

### 2. Gmail (sends the emails)

1. Your Google account needs **2-Step Verification** turned on: https://myaccount.google.com/security
2. Open https://myaccount.google.com/apppasswords, type `SwimSure` and click **Create**. Copy the 16-letter password.

### 3. Put the keys in `.env.local`

Copy `.env.example` to `.env.local` and fill in:

| Name | What to put |
| --- | --- |
| `SUPABASE_URL` | Project URL from step 1 |
| `SUPABASE_ANON_KEY` | anon / publishable key from step 1 |
| `GMAIL_USER` | the Gmail address that sends emails |
| `GMAIL_APP_PASSWORD` | the 16-letter app password |
| `NOTIFY_EMAIL` | where alerts go (blank = same Gmail) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | optional, e.g. `919876543210` |

Restart `npm run dev`, send a test enquiry with your own email, and check that you receive both emails and that a row appears in Supabase → Table Editor → `enquiries`.

### 4. Put it online (Vercel)

1. Push this folder to a new GitHub repo.
2. On https://vercel.com click **Add New → Project** and import the repo.
3. Under **Environment Variables**, add the same values as in `.env.local`, then click **Deploy**.

## Where things are

| File | What it is |
| --- | --- |
| `app/page.tsx` | all the page text and sections |
| `app/globals.css` | colours and layout |
| `app/_ui/EnquiryForm.tsx` | the form |
| `app/_ui/SocietyCalculator.tsx` | the slider calculator |
| `app/_ui/Logo.tsx` + `app/icon.svg` | the logo and browser-tab icon |
| `app/actions.ts` | checks the form, saves to Supabase, triggers emails |
| `lib/email.ts` | the alert email and the 3 auto-reply emails |
| `supabase/schema.sql` | the database table and its security rule |

## Managing enquiries

Open Supabase → **Table Editor → enquiries**. Change the `status` column as you go: `new` → `contacted` → `enrolled` / `closed`.

## Safety notes

- The public key can **only add** enquiries. Nobody can read them through the website (Row Level Security).
- A hidden "spam trap" field quietly drops most bot submissions.
- Keys live only in `.env.local` / Vercel settings and are never sent to the browser.
