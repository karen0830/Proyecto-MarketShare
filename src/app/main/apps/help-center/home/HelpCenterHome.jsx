import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { lighten, ThemeProvider } from "@mui/material/styles";
import { selectMainThemeDark } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import { OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useSelector } from "react-redux";
import FaqList from "../faqs/FaqList";
import { useGetHelpCenterMostlyFaqsQuery } from "../HelpCenterApi";

/**
 * The help center home.
 */
function HelpCenterHome() {
  const mainThemeDark = useSelector(selectMainThemeDark);
  const { data: faqsMost } = useGetHelpCenterMostlyFaqsQuery();
  return (
    <div className="flex flex-col flex-auto min-w-0">
      <ThemeProvider theme={mainThemeDark}>
        <Box
          className="relative pt-32 pb-112 px-16 sm:pt-80 sm:pb-192 sm:px-64 overflow-hidden"
          sx={{
            backgroundColor: "primary.dark",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.primary.main),
          }}
        >
          <div className="flex flex-col items-center justify-center  mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0 } }}
            >
              <Typography color="inherit" className="text-18 font-semibold">
                CENTRO DE AYUDA
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0 } }}
            >
              <Typography className="mt-4 text-32 sm:text-48 font-extrabold tracking-tight leading-tight text-center">
                ¿Como podemos ayudarte hoy?
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography
                color="text.secondary"
                className="mt-12 sm:text-20 text-center tracking-tight"
              >
                Busque un tema o pregunta, consulte nuestras preguntas
                frecuentes y guías, contáctenos para obtener asistencia
                detallada
              </Typography>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
              <OutlinedInput
                className="flex flex-1 items-center px-16 mx-8 rounded-full h-44 w-full max-w-320 sm:max-w-480 mt-40 sm:mt-80"
                placeholder="Ingrese una pregunta, tema o palabra clave"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <FuseSvgIcon color="disabled">
                      heroicons-solid:search
                    </FuseSvgIcon>
                  </InputAdornment>
                }
                inputProps={{
                  "aria-label": "Search",
                }}
              />
            </motion.div>
          </div>

          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="text-gray-700 opacity-25"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </g>
          </svg>
        </Box>
      </ThemeProvider>

      <div className="flex flex-col items-center px-24 sm:px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-32 md:gap-y-0 md:gap-x-24 w-full max-w-sm md:max-w-4xl -mt-64 sm:-mt-96"></div>
      </div>

      <Typography className="mt-96 px-16 text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-center ">
        Preguntas más frecuentes
      </Typography>
      <Typography
        className="mt-8 px-16 text-xl text-center"
        color="text.secondary"
      >
        Aquí están las preguntas más frecuentes que puede consultar antes de
        empezar
      </Typography>

      <div className="flex flex-col w-full px-16 items-center my-48">
        <FaqList className="w-full max-w-4xl" list={faqsMost} />
      </div>
    </div>
  );
}

export default HelpCenterHome;
