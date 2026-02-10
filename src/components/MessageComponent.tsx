type MessageProps = {
  text: string;
  isMe?: boolean;
};

export const MessageComponent = ({ text, isMe = false }: MessageProps) => {
  return (
    <div
        className={[
            "max-w-[70%] w-fit p-3 border rounded-md text-[0.8rem] break-words",
            isMe ? "self-end bg-blue-500 text-white border-blue-500" : "self-start bg-[#f5f5f5]"
        ].join(" ")}
    >
      {text}
    </div>
  );
};