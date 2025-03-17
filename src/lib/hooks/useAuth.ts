import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;
  
  /**
   * بررسی می‌کند که آیا کاربر نقش خاصی دارد یا خیر
   */
  const hasRole = (role: string | string[]) => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };
  
  /**
   * ورود کاربر با ایمیل و رمز عبور
   */
  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    return result;
  };
  
  /**
   * خروج کاربر
   */
  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  
  /**
   * هدایت به صفحه ورود اگر کاربر احراز هویت نشده باشد
   */
  const requireAuth = (callback?: () => void) => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      router.push("/signin");
    } else if (callback) {
      callback();
    }
  };
  
  /**
   * هدایت به صفحه داشبورد اگر کاربر قبلاً احراز هویت شده باشد
   */
  const redirectIfAuthenticated = (callback?: () => void) => {
    if (isLoading) return;
    
    if (isAuthenticated) {
      router.push("/dashboard");
    } else if (callback) {
      callback();
    }
  };
  
  return {
    user,
    isAuthenticated,
    isLoading,
    hasRole,
    login,
    logout,
    requireAuth,
    redirectIfAuthenticated,
  };
} 