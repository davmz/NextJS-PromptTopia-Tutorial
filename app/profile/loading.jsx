import Image from "next/image";

const Loading = () => {
    return (
        <div className="w-full flex-center">
            <Image
                width={50}
                height={50}
                alt="loader"
                className="object-contain"
                src="assets/icons/loader.svg"
            />
        </div>
    );
};

export default Loading;