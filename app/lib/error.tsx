"use client";

type Props = {
  error: {
    message: string;
  };
};

const error = ({ error }: Props) => {
  return <div>{error.message}</div>;
};

export default error;
