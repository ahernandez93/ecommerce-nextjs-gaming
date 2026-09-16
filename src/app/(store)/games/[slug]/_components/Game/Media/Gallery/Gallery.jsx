"use client";

import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FullModal } from "@/components/Shared";
import styles from "./Gallery.module.css";

function getImageKey(image, index) {
    return image.documentId ?? image.id ?? `${image.url}-${index}`;
}

export function Gallery({ screenshots = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (screenshots.length === 0) {
        return null;
    }

    const principalImage = screenshots[0];
    const secondaryImages = screenshots.slice(1, 5);

    const hasSecondaryImages = secondaryImages.length > 0;

    function openGallery(index) {
        setSelectedIndex(index);
        setShowModal(true);
    }

    function closeGallery() {
        setShowModal(false);
    }

    const settings = {
        dots: true,
        dotsClass: styles.dots,
        infinite: screenshots.length > 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        initialSlide: selectedIndex,
        adaptiveHeight: false,

        customPaging(index) {
            const screenshot = screenshots[index];

            return (
                <span className={styles.thumbnail}>
                    <Image
                        src={screenshot.url}
                        alt=""
                        fill
                        sizes="150px"
                        className="object-cover"
                    />
                </span>
            );
        },
    };

    return (
        <>
            <div
                className={
                    hasSecondaryImages ? "grid grid-cols-2 gap-5" : "w-full"
                }
            >
                <button
                    type="button"
                    onClick={() => openGallery(0)}
                    aria-label="Ampliar captura principal"
                    className={
                        hasSecondaryImages
                            ? `
                                relative h-full min-h-full w-full
                                overflow-hidden rounded-2xl
                                border-0 p-0
                            `
                            : `
                                relative aspect-video w-full
                                overflow-hidden rounded-2xl
                                border-0 p-0
                            `
                    }
                >
                    <Image
                        src={principalImage.url}
                        alt="Captura principal del juego"
                        fill
                        sizes={
                            hasSecondaryImages
                                ? "(max-width: 1127px) 50vw, 554px"
                                : "(max-width: 1127px) 100vw, 1127px"
                        }
                        className="
                            object-cover transition-opacity
                            hover:opacity-60
                        "
                    />
                </button>

                {hasSecondaryImages && (
                    <div className="grid grid-cols-2 grid-rows-2 gap-5">
                        {secondaryImages.map((screenshot, index) => {
                            const originalIndex = index + 1;

                            return (
                                <button
                                    key={getImageKey(screenshot, originalIndex)}
                                    type="button"
                                    onClick={() => openGallery(originalIndex)}
                                    aria-label={`Ampliar captura ${originalIndex + 1}`}
                                    className="
                                relative aspect-video
                                overflow-hidden rounded-2xl
                                border-0 p-0
                            "
                                >
                                    <Image
                                        src={screenshot.url}
                                        alt={`Captura ${originalIndex + 1} del juego`}
                                        fill
                                        sizes="(max-width: 1127px) 25vw, 267px"
                                        className="
                                    object-cover
                                    transition-opacity
                                    hover:opacity-60
                                "
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <FullModal
                show={showModal}
                onClose={closeGallery}
                title="Galería de capturas del juego"
            >
                <div className={styles.carouselContainer}>
                    <Slider
                        key={selectedIndex}
                        {...settings}
                        className={styles.slider}
                    >
                        {screenshots.map((screenshot, index) => (
                            <div
                                key={getImageKey(screenshot, index)}
                                className={styles.slide}
                            >
                                <div className={styles.slideImage}>
                                    <Image
                                        src={screenshot.url}
                                        alt={`Captura ampliada ${index + 1} del juego`}
                                        fill
                                        priority={index === selectedIndex}
                                        sizes="80vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </FullModal>
        </>
    );
}
