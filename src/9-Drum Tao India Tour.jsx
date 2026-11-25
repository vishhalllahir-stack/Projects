import ToyotaFooter from "./Footer";

export default function DrumTaoIndiaTour () {

    const drumTaoImages = [
  {
    id: 1,
    image:
      "https://static3.toyotabharat.com/images/drumtao/drumtaoherobanner.webp",
    title: "DRUM TAO Hero Banner",
  },
  {
    id: 2,
    image:
      "https://static3.toyotabharat.com/images/drumtao/drumimagelft.webp",
    title: "DRUM TAO Left Image",
  },
  {
    id: 3,
    image:
      "https://static3.toyotabharat.com/images/drumtao/image%20(6).webp",
    title: "DRUM TAO Image 6",
  },
  {
    id: 4,
    image:
      "https://static3.toyotabharat.com/images/drumtao/image%20(8).webp",
    title: "DRUM TAO Image 8",
  },
  {
    id: 5,
    image:
      "https://static3.toyotabharat.com/images/drumtao/image(7).webp",
    title: "DRUM TAO Image 7",
  },
  {
    id: 6,
    image:
      "https://static3.toyotabharat.com/images/drumtao/drumtao-2026-1920x807.webp",
    title: "DRUM TAO 2026 Banner",
  },
];


  return (
    <div>
      {drumTaoImages.map((item) => (
        <img
          key={item.id}
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        />
      ))}

        <div>
            <ToyotaFooter />
        </div>
    </div>
  );
}

