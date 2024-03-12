import { motion } from "framer-motion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const StyledAccordion = styled(Accordion)(() => ({
  border: "none!important",
  borderRadius: "8px!important",
  "&:before": {
    display: "none",
  },
}));

/**
 * The faq list component.
 */
function FaqList() {
  const [expanded, setExpanded] = useState(false);
  const toggleAccordion = (panel) => (_, _expanded) => {
    setExpanded(_expanded ? panel : false);
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={clsx("space-y-24")}
    >
      <StyledAccordion classes={{ root: "FaqPage-panel shadow" }}>
        <AccordionSummary
          expandIcon={<FuseSvgIcon>heroicons-outline:chevron-down</FuseSvgIcon>}
        >
          <div className="flex items-center py-4">
            <FuseSvgIcon color="action">
              heroicons-outline:question-mark-circle
            </FuseSvgIcon>
            <Typography className="px-12 font-medium">
              ¿Cómo puedo compartir un producto que me gusta con mis amigos en
              la plataforma?
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Typography className="text-14 px-32 pb-8 -mt-8">
            <p>
              {" "}
              Puedes compartir productos que te gustan con tus amigos de manera
              fácil y rápida. Simplemente busca el botón de compartir en la
              página del producto y elige cómo te gustaría compartirlo:
              directamente en tu perfil dentro de la plataforma, a través de un
              mensaje privado, o en tus redes sociales conectadas. Esto permite
              una experiencia de compra más social y colaborativa.
            </p>
          </Typography>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion classes={{ root: "FaqPage-panel shadow" }}>
        <AccordionSummary
          expandIcon={<FuseSvgIcon>heroicons-outline:chevron-down</FuseSvgIcon>}
        >
          <div className="flex items-center py-4">
            <FuseSvgIcon color="action">
              heroicons-outline:question-mark-circle
            </FuseSvgIcon>
            <Typography className="px-12 font-medium">
              ¿Es posible seguir a vendedores o tiendas favoritas en la
              plataforma?
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Typography className="text-14 px-32 pb-8 -mt-8">
            <p>
              {" "}
              Sí, nuestra plataforma te permite seguir a tus vendedores o
              tiendas favoritas. Al hacerlo, recibirás actualizaciones en tu
              feed sobre nuevos productos, ofertas especiales y eventos. Esta es
              una excelente manera de mantenerse al tanto de las últimas
              novedades de tus marcas preferidas.
            </p>
          </Typography>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion classes={{ root: "FaqPage-panel shadow" }}>
        <AccordionSummary
          expandIcon={<FuseSvgIcon>heroicons-outline:chevron-down</FuseSvgIcon>}
        >
          <div className="flex items-center py-4">
            <FuseSvgIcon color="action">
              heroicons-outline:question-mark-circle
            </FuseSvgIcon>
            <Typography className="px-12 font-medium">
              ¿Cómo funciona el sistema de recomendaciones de productos en la
              plataforma?
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Typography className="text-14 px-32 pb-8 -mt-8">
            <p>
              {" "}
              Nuestro sistema de recomendaciones utiliza algoritmos avanzados
              que toman en cuenta tus interacciones previas, productos que has
              comprado o mostrado interés, y la actividad de usuarios con gustos
              similares a los tuyos. Esto nos permite presentarte una selección
              personalizada de productos que creemos te interesará, mejorando
              así tu experiencia de compra.
            </p>
          </Typography>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion classes={{ root: "FaqPage-panel shadow" }}>
        <AccordionSummary
          expandIcon={<FuseSvgIcon>heroicons-outline:chevron-down</FuseSvgIcon>}
        >
          <div className="flex items-center py-4">
            <FuseSvgIcon color="action">
              heroicons-outline:question-mark-circle
            </FuseSvgIcon>
            <Typography className="px-12 font-medium">
              ¿Qué medidas se toman para garantizar la seguridad y privacidad de
              mis datos?
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Typography className="text-14 px-32 pb-8 -mt-8">
            <p>
              {" "}
              La seguridad y privacidad de tus datos son nuestra máxima
              prioridad. Implementamos encriptación de datos de vanguardia y
              seguimos las mejores prácticas de seguridad para proteger tu
              información personal y transacciones. Regularmente revisamos y
              actualizamos nuestras políticas y sistemas de seguridad para
              asegurar que tu información esté segura.
            </p>
          </Typography>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion classes={{ root: "FaqPage-panel shadow" }}>
        <AccordionSummary
          expandIcon={<FuseSvgIcon>heroicons-outline:chevron-down</FuseSvgIcon>}
        >
          <div className="flex items-center py-4">
            <FuseSvgIcon color="action">
              heroicons-outline:question-mark-circle
            </FuseSvgIcon>
            <Typography className="px-12 font-medium">
              ¿Puedo devolver un producto si no cumple con mis expectativas?
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Typography className="text-14 px-32 pb-8 -mt-8">
            <p>
              {" "}
              Sí, entendemos que a veces un producto puede no ser exactamente lo
              que esperabas. Ofrecemos una política de devoluciones flexible
              dentro de los primeros 30 días después de la compra, siempre y
              cuando el producto esté en su condición original y con el embalaje
              correspondiente. Para iniciar una devolución, por favor visita la
              sección de ayuda en nuestra plataforma para más instrucciones.
            </p>
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
    </motion.div>
  );
}

export default FaqList;
