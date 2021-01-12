import { Box } from 'components/material/Box';
import { Button } from 'components/material/Button';
import { Switch } from 'components/material/Switch';
import { TextField } from 'components/material/Textfield';
import React, { useState } from 'react';

const Playground = () => {
    const [checked, setChecked] = useState(true);
    return (
        <>
        <Box>
            Buttons
            <Button color="primary" onClick={()=>{alert('hello!')}}>
                Primary
            </Button>
            <Button color="secondary">
                Secondary
            </Button>
            <Button >
                default
            </Button>
        </Box>
        <hr/>
        <Box>
            Text Field
            <TextField placeholder="hello" size={100} />
        </Box>
        <hr/>
        <Box>
            <Box>
                Switch
            </Box>

            <Switch/>
            <Switch size='md' checked={!checked} onChange={()=>setChecked(prev=>!prev)}/>
            <Switch size='lg'/>
        </Box>
        <hr/>
        </>
    )
}

export default Playground;