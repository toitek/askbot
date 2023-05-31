import React from "react";
import { IconBrandGoogle } from "@tabler/icons-react";

interface Props {
  clickHandler: () => void;
}
export const GoogleBtn = (props: Props) => {
  return (
    <button className={`relative w-full my-2 px-4 py-2 text-sm border border-gray-300 rounded-lg `} onClick={props.clickHandler}>
      <span className="flex items-center justify-center">
        <IconBrandGoogle size={16} />
        <span className="px-2"> Continue with Google</span>
      </span>
    </button>
  );
};

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// export default function GoogleAuthPage() {
//   const router = useRouter();

//   useEffect(() => {
//     async function authenticateWithGoogle() {
//       const { user, session, error } = await supabase.auth.signIn({
//         provider: 'google'
//       });

//       if (error) {
//         console.error(error);
//         // Handle authentication error
//         return;
//       }

//       if (user && session) {
//         // User is authenticated, redirect to the dashboard or any other page
//         // e.g., router.push('/dashboard');
//       }
//     }

//     authenticateWithGoogle();
//   }, []);

//   return (
//     <div>
//       <h1>Google Authentication</h1>
//       <p>Authenticating with Google...</p>
//     </div>
//   );
// }
