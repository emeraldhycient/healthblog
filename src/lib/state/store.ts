import {create} from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"
import { queryClient } from "../utils/init";

type Profile = {
    fullname: string;
    username: string;
    bio: string;
    isLoggedIn: boolean;
    isVerified: boolean;
    earnings: number;
    totalArticles: number;
    verification_status: string
};

type AuthStore = {
    token: string
    setToken: (token: string) => void;
    setProfile: (profile: Partial<Profile>) => void;
    email: string;
    setEmail: (email: string) => void;
    fullname: string;
    username: string;
    followersLength: number;
    setFollowersLength: (followersLength: number) => void;
    bio: string;
    isLoggedIn: boolean;
    isVerified: boolean;
    earnings: number;
    totalArticles: number;
    verification_status: string;
    setIsVerified: (isVerified: boolean) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    _hasHydrated: boolean; 
    setHasHydrated: (state: boolean) => void;
    logout: () => void;
}

export const  useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: "",
            setToken: (token) => set({ token: token }),
            setProfile: (profile) => set(profile),
            fullname: "",
            username: "",
            email: "",
            earnings: 0,
            totalArticles: 0,
            verification_status: "",
            setEmail: (email) => set({email: email}),
            followersLength: 0,
            setFollowersLength: (followersLength) => set({followersLength: followersLength}),
            bio: "",
            isLoggedIn: false,
            setIsLoggedIn: (isLoggedIn) => set({isLoggedIn: isLoggedIn}),
            isVerified: false,
            setIsVerified: (isVerified) => set({isVerified: isVerified}),
            logout: () => 
                set(() => {
                    queryClient.clear()
                    return {token: "", fullname: "", username: "", bio: "", isLoggedIn: false }
                }),
            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                })
            }
            
        }),
        {
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
            name: "phred-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)