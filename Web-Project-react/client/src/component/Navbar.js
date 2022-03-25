import axios from "axios";
import { useEffect ,useState} from "react";
import { Grid, Button, InputBase, Paper, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



function Navbar({session}) {
    const [logined, setLogined] = useState(false);

    useEffect(() => {
        if(session !== '') {
            setLogined(true);
        }
    }, [])
    
    return <Grid container spacing={2} sx={{bgcolor : '#212529', py : '10px'}}>
    <Grid item sx={{width:'250px'}}>
        <Typography 
          variant='h5' 
          component="div" 
          gutterBottom
          sx={{color : '#fff', px : '70px'}}
        >
            Company
        </Typography>
    </Grid>
    <Grid item xs sx={{pl: 0}}>
        <Paper 
            component="form"
            action='/search'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton variant='outlined' type="submit" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    </Grid>
    <Grid item xs={1.1}>
        <Button 
            variant='outlined'
            size='large'
            href={!logined ? "/user/login" : ''}
            sx={{
                borderColor: '#fff', 
                color: '#fff', 
                border: 2, 
                fontSize: 15,
                '&:hover' : {
                    borderColor: '#003964',
                    backgroundColor : '#003964',
                    color: '#fff'
                }
             }}
        >
            {!logined ? '로그인' : `${session.name}`}
        </Button>
    </Grid>
</Grid>
}

export default Navbar;