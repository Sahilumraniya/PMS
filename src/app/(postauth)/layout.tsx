"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading"; // Assuming you have a Loading component
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";

export default function PostAuthLayout({ children }: Readonly<{ children: any }>) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      if (token) {
        try {
          const res = await fetch("/api/auth/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          });

          if (res.ok) {
            const data = await res.json();
            console.log("Token verified:", data);
            dispatch(login({ userData: data.user, accessToken: token })); // Save user data and token to Redux store
            setIsAuthenticated(true); // Token is valid
          } else {
            setIsAuthenticated(false);
            router.push("/login"); // Redirect to login page if token is invalid
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsAuthenticated(false);
          router.push("/login"); // Redirect if error occurs
        }
      } else {
        setIsAuthenticated(false);
        router.push("/login"); // Redirect to login if no token found
      }

      setLoading(false); // Stop loading screen after checking
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loading />; // Show loading indicator while checking authentication
  }

  if (!isAuthenticated) {
    return null; // Render nothing if not authenticated (redirect will happen immediately)
  }

  return <>{children}</>; // Render the children (protected content) if authenticated
}
