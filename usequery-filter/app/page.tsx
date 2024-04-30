"use client";
import { useCallback, useRef } from "react";
import { mockData } from "./constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const foodSearch = searchParams.get("sort");
  const filterRef = useRef("bugd");

  const filter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e: any) => {
    filterRef.current = e.target.value;
    router.push(pathname + "?" + filter("sort", e.target.value));
  };
  console.log(searchParams.get("sort"));

  const filterData = mockData.filter((el) => {
    return foodSearch == "bugd" ? el : el.name == foodSearch;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="flex justify-center text-[30px]">
          sain baitsgaana uu odoo bi usequery ashiglah bolno
        </h1>
        <select
          name=""
          onChange={handleChange}
          id="1"
          className="p-3 border-yellow-600 border-2 rounded-xl"
        >
          <option value="bugd">bugd</option>
          <option value="burger">burger</option>
          <option value="pizza">pizza</option>
        </select>

        {filterData.map((e, index) => {
          return (
            <div key={index + e.name} className="flex justify-between ">
              <img src={e.img} alt="" />
              <p className="text-[25px] text-orange-700">{e.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
