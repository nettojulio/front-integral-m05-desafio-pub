import "./style.css";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";
import useFunctions from "../../../hooks/useFunctions";

export default function CustomizedTimeline() {
  const { togglePage } = useFunctions();

  return (
    <div className="container-signup">
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            {!togglePage && (
              <TimelineDot color="success">
                <CircleIcon />
              </TimelineDot>
            )}
            {togglePage && (
              <TimelineDot color="success">
                <CheckOutlinedIcon />
              </TimelineDot>
            )}

            <TimelineConnector sx={{ backgroundColor: "green" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "1.8rem", color: "#0E8750" }}
            >
              Cadastre-se
            </Typography>
            <Typography variant="body1">
              Por favor, escreva seu nome e e-mail
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ backgroundColor: "green" }} />
            {!togglePage && (
              <TimelineDot color="success" variant="outlined">
                <CircleIcon color="success" />
              </TimelineDot>
            )}
            {togglePage === "signupPassword" && (
              <TimelineDot color="success">
                <CircleIcon />
              </TimelineDot>
            )}
            {togglePage === "signupDone" && (
              <TimelineDot color="success">
                <CheckOutlinedIcon />
              </TimelineDot>
            )}

            <TimelineConnector sx={{ backgroundColor: "green" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "1.8rem", color: "#0E8750" }}
            >
              Escolha uma senha
            </Typography>
            <Typography variant="body1">Escolha uma senha segura</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ backgroundColor: "green" }} />
            {(!togglePage || togglePage === "signupPassword") && (
              <TimelineDot color="success" variant="outlined">
                <CircleIcon color="success" />
              </TimelineDot>
            )}
            {togglePage === "signupDone" && (
              <TimelineDot color="success">
                <CheckOutlinedIcon />
              </TimelineDot>
            )}
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2, mt: "6px" }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "1.8rem", color: "#0E8750" }}
            >
              Cadastro realizado com sucesso
            </Typography>
            <Typography variant="body1">
              E-mail e senha cadastrados com sucesso
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
