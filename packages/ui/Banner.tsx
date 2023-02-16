export type BannerVariant = "violet" | "black";

export type BannerProps = {
  label: string;
  variant: BannerVariant;
};

export const Banner = ({ label, variant }: BannerProps) => {
  return (
    <div
      style={{
        backgroundColor: variant === "violet" ? "#9333EA" : "#000",
        color: "white",
        textAlign: "center",
        padding: "10px",
        fontSize: "13px",
        fontWeight: "bold",
      }}
    >
      {label}
    </div>
  );
};
