"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const clients = [
  {
    name: "First Coffee",
    logo: "/assets/home/clients/first-coffee.png",
    width: 120,
    height: 40,
  },
  {
    name: "Greybird",
    logo: "/assets/home/clients/greybird.png",
    width: 130,
    height: 28,
  },
  {
    name: "Ecojoys",
    logo: "/assets/home/clients/ecojoys.png",
    width: 110,
    height: 44,
  },
  {
    name: "Related",
    logo: "/assets/home/clients/related.png",
    width: 120,
    height: 36,
  },
];

export default function Clients() {
  const t = useTranslations("clients");

  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center uppercase font-medium mb-12"
          style={{
            fontSize: "13px",
            letterSpacing: "0.2em",
            color: "rgba(0,0,0,0.35)",
          }}
        >
          {t("label")}
        </motion.p>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="transition-all duration-300"
              style={{ filter: "grayscale(100%) opacity(0.45)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "grayscale(0%) opacity(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "grayscale(100%) opacity(0.45)";
              }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="object-contain"
                style={{ maxHeight: "56px", width: "auto" }}
              />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
