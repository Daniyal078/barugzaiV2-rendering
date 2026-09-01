"use client";

import { useEffect, useRef } from "react";
import { api_base_url } from "@/lib/utils";

interface ViewTrackerProps {
    slug: string;
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
    const hasTriggered = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger when the user scrolls down by more than 100 pixels
            if (window.scrollY > 100 && !hasTriggered.current) {
                hasTriggered.current = true; // Prevent multiple requests

                fetch(`${api_base_url}/api/v1/blogs/${slug}/view`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).catch((err) => {
                    console.error("Failed to record view count:", err);
                });

                // Clean up event listener once fired
                window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [slug]);

    // Renders nothing visible
    return null;
}