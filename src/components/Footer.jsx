import { Typography } from "@mui/material";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-custom-purple bg-custom-beige border-t-2 border-custom-purple h-100 pb-[8rem] md:pb-5">
      <section className="py-10 px-10 mx-0 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        <div>
          <Typography variant="h6">Ideation</Typography>
          <Typography variant="body1">ChatGPT</Typography>
        </div>

        <div>
          <Typography variant="h6">Contact us</Typography>
          <Typography variant="body1">info@function.com</Typography>
        </div>

        <div>
          <Typography variant="h6">Production</Typography>
          <Typography variant="body1">KEA Copenahgen</Typography>
        </div>

        <div>
          <Typography variant="h6">Design</Typography>
          <Typography variant="body1">Function Agency</Typography>
        </div>

        <div className=" col-span-2">
          <Typography variant="h6">Production partner</Typography>
          <Typography variant="body1">Jonas Holbeck</Typography>
        </div>
      </section>
    </footer>
  );
}
