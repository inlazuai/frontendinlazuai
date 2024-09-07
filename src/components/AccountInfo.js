import { useSelector } from "react-redux";
// mui
import { Card, Stack, Typography } from "@mui/material";
//
import MainLayout from "../layouts/full/mainlayout";

export default function AccountInfo() {
  const user = useSelector((store) => store.auth.user);

  return (
    <MainLayout title="Account Info">
      <Stack width="100%" alignItems="center">
        <Typography variant="h4" my={3}>
          Your Account Info
        </Typography>
        <Card>
          <Stack p={3}>
            <Typography variant="h5" align="center" mb={3}>
              {user.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>
                <b>Email:</b>
              </Typography>
              <Typography>{user.email}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>
                <b>Plan:</b>
              </Typography>
              <Typography>{user.membership}</Typography>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </MainLayout>
  );
}
