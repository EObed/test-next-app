"use client";
import LeafletMap from "@/components/LeafletMap";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import Image from "next/image";
import DatePickerComp from "@/components/DatePickerComp";
import ProjectTimeline from "@/components/ProjectTimeline";
import { BiGame } from "react-icons/bi";

export default function Home() {
  const [longitude, setLongitude] = useState(-0.2175);
  const [latitude, setLatitude] = useState(5.6);

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLongitude(value);
    }
  };

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLatitude(value);
    }
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImageButtonClick = () => {
    setImagePreview(null);
  };

  const newArray = [
    [
      {
        title: "Task 1",
        startDate: "2024-01-01",
        endDate: "2024-01-05",
        bg: "red",
      },
      {
        title: "Task 2",
        startDate: "2024-01-03",
        endDate: "2024-01-09",
        bg: "red",
      },
      {
        title: "Task 3",
        startDate: "2024-01-09",
        endDate: "2024-01-13",
        bg: "red",
      },
      {
        title: "Task 4",
        startDate: "2024-01-12",
        endDate: "2024-01-15",
        bg: "red",
      },
      {
        title: "Task 5",
        startDate: "2024-01-13",
        endDate: "2024-01-18",
        bg: "red",
      },
    ],
    [
      {
        title: "Task A",
        startDate: "2024-01-18",
        endDate: "2024-01-22",
        bg: "yellow",
      },
      {
        title: "Task B",
        startDate: "2024-01-22",
        endDate: "2024-01-25",
        bg: "yellow",
      },
      {
        title: "Task C",
        startDate: "2024-01-20",
        endDate: "2024-01-24",
        bg: "yellow",
      },
      {
        title: "Task D",
        startDate: "2024-01-23",
        endDate: "2024-01-27",
        bg: "yellow",
      },
      {
        title: "Task E",
        startDate: "2024-01-27",
        endDate: "2024-01-30",
        bg: "yellow",
      },
    ],
  ];

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full flex h-96">
        <div className="w-[50%] p-1">
          <div className="font-bold">Leaflet</div>
          <div className="w-full h-[60%] bg-slate-500">
            <LeafletMap latitude={latitude} longitude={longitude} />
          </div>
          <div className="my-3">
            <input
              className="border p-2"
              type="number"
              value={longitude}
              onChange={handleLongitudeChange}
            />
            <input
              className="border p-2"
              type="number"
              value={latitude}
              onChange={handleLatitudeChange}
            />
          </div>
        </div>
        <div className="w-[50%] h-[60%] bg-slate-300 p-1 flex flex-col justify-center items-center">
          {imagePreview ? (
            <div className="relative">
              <Image
                src={imagePreview}
                alt="Preview"
                className="max-h-full max-w-full"
                width={570}
                height={100}
              />
              <button
                type="button"
                className="absolute top-[50%] left-[50%] bg-[#F2F9FC] p-2 rounded-lg"
                onClick={handleChangeImageButtonClick}
              >
                Change Image
              </button>
            </div>
          ) : (
            <>
              <div>Upload Image</div>
              <div className="text-sm text-slate-400">Max file size: 2MB</div>
              <input type="file" onChange={handleImageChange} />
            </>
          )}
        </div>
      </div>
      <div className="w-full">
        <DatePickerComp startDate="2024-12-12" />
      </div>
      <div className="w-full h-96">
        <ProjectTimeline
          startDate="2024-01-01"
          endDate="2024-05-05"
          tasks={newArray}
        />
      </div>
    </div>
  );
}
