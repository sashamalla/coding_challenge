import { Fragment, ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const startupArray = StartupHttpService.getStartUps().then(
      (startUpList) => {
        setStartups(startUpList);
      }
    );
  }, []);

  return (
    <div>
      {startups.map((startup) => (
        <div key={startup.id}>
          <Card sx={{ margin: 2 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                {startup.name}
              </Typography>
              <Typography sx={{ fontSize: 15 }}>
                {`${JSON.stringify(startup.dateFounded)} | ${
                  startup.employees
                } | ${startup.totalFunding} | ${
                  startup.currentInvestmentStage
                }`}
              </Typography>
              <Typography sx={{ fontSize: 18 }}>
                {startup.shortDescription}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
