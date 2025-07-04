import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useRef } from "react";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      {/* //->header content */}
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5" loading="lazy" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16">
          Your Own <span className="text-primary">Blogging</span> <br />{" "}
          Platform
        </h1>

        <p className="my-6 sm:my-8 mx-w-2xl m-auto max-sm:text-xs">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's <br /> one word or a thousand,
          your story starts right here.
        </p>

        <form
          onSubmit={submitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden relative"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            className="w-full pl-4 outline-none "
          />
          {input && (
            <span
              onClick={onClear}
              className="border font-light text-xs cursor-pointer absolute right-[25%] top-[30%]"
            >
              ❌
            </span>
          )}

          <input
            type="submit"
            value="Search"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          />
        </form>
      </div>

      {/* //->bg-image  */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -z-1 -top-50 opacity-50"
        loading="lazy"
      />
    </div>
  );
};

export default Header;
