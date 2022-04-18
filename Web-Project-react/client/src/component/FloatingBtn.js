import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function FloatingBtn({isClicked, setClick}) {

    const createMultiWindow = () => {
       setClick(!isClicked);
    }

    return <Button  onClick={createMultiWindow} 
            sx={{
                position : 'fixed',
                right : '30px',
                bottom : '30px',
                borderRadius : '0.5rem',
                border : '0.125rem solid transparent',
                backgroundColor : '#fff',
                borderColor : '#2c3e50',
                color : '#2c3e50',
                fontWeight : 400,
                fontSize : '1rem',
                zIndex : '10000',
                boxShadow : '0 1rem 3rem rgba(0, 0, 0, 0.175)' ,
                paddingX : '1rem',
                paddingY : '1rem',
                display : 'inline-block',             
            }}
        >
            빠른 검색
            <SearchOutlinedIcon sx={{fontSize : 20, ml : 0.5, verticalAlign : 'middle'}} />
        </Button>


}

export default FloatingBtn;