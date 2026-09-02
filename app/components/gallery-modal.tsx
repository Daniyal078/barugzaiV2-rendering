/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ChevronLeft, ChevronRight, X, LayoutPanelTop } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { api_base_url, cn } from "@/lib/utils"
import Image from "next/image"

export function GalleryModal({ data, isOpen, onClose, initialIndex }: any) {
    const STORAGE_BASE = api_base_url + '/storage/app/public'

    function storageUrl(path?: string | null): string | undefined {
        if (!path) return undefined
        if (path.startsWith('http')) return path
        return `${STORAGE_BASE}/${path.replace(/^\//, '')}`
    }

    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [showThumbnails, setShowThumbnails] = useState(true)
    const [direction, setDirection] = useState(0)

    const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        if (showThumbnails && thumbnailRefs.current[currentIndex]) {
            thumbnailRefs.current[currentIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            })
        }
    }, [currentIndex, showThumbnails])

    const goToPrevious = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((prev: number) => (prev - 1 + data.car.images.length) % data.car.images.length)
    }, [data.car.images.length])

    const goToNext = useCallback(() => {
        setDirection(1)
        setCurrentIndex((prev: number) => (prev + 1) % data.car.images.length)
    }, [data.car.images.length])

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[85vw] md:max-h-full max-h-[400px] min-w-90 h-[90vh] p-0 border-none bg-transparent shadow-none flex flex-col items-center justify-center overflow-hidden">
                <DialogTitle className="sr-only">Gallery</DialogTitle>

                {/* Top Controls */}
                <div className="absolute right-7 top-7 z-50 flex gap-2">
                    <DialogClose className="rounded-full bg-black/40 p-2 cursor-pointer text-white backdrop-blur-sm hover:bg-background/40 transition-colors">
                        <X className="h-6 w-6" />
                    </DialogClose>
                </div>

                {/* Main Image Area */}
                <div className="relative w-full flex-1 flex items-center justify-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPrevious}
                        className="absolute left-7 cursor-pointer z-20 bg-black/40 drop-shadow-2xl text-white rounded-full h-8 w-8"
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </Button>

                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                className="absolute w-full h-full"
                            >
                                <Image src={storageUrl(data.car.images[currentIndex].url) || ''}
                                    alt="Gallery"
                                    className="object-contain w-full"
                                    width={800}
                                    height={600}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNext}
                        className="absolute right-7 z-20 cursor-pointer bg-black/40 drop-shadow-2xl text-white rounded-full h-8 w-8"
                    >
                        <ChevronRight className="h-10 w-10" />
                    </Button>
                </div>

                {/* Sliding Thumbnails Panel */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowThumbnails(!showThumbnails)}
                    className="rounded-full bg-black/40 text-white absolute right-7 z-30 bottom-36 backdrop-blur-sm hover:bg-background/40 border-none"
                    title={showThumbnails ? "Hide Thumbnails" : "Show Thumbnails"}>
                    <LayoutPanelTop className="h-5 w-5" />
                </Button>
                <AnimatePresence>
                    {showThumbnails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="w-full bg-black/20 backdrop-blur-md border-t border-white/10 overflow-hidden"
                        >
                            <div className="w-full overflow-hidden no-scrollbar py-4">
                                <div className="flex justify-start sm:justify-center gap-3 min-w-max">
                                    {data.car.images.map((image: any, index: number) => (
                                        <button
                                            key={index}
                                            ref={(el) => { thumbnailRefs.current[index] = el }}
                                            onClick={() => {
                                                setDirection(index > currentIndex ? 1 : -1)
                                                setCurrentIndex(index)
                                            }}
                                            className={cn(
                                                "relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all shrink-0",
                                                index === currentIndex
                                                    ? "border-primary scale-110 shadow-lg shadow-primary/20"
                                                    : "border-transparent opacity-40 hover:opacity-100"
                                            )}
                                        >
                                            <img
                                                src={storageUrl(image.url) || ''}
                                                alt="Thumb"
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}