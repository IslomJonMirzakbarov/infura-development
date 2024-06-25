import { Box, Typography } from '@mui/material'
import { ReactComponent as AddIcon } from 'assets/icons/add_icon.svg'
import { ReactComponent as UploadIcon } from 'assets/icons/upload_icon.svg'
import Container from 'components/Container'
import PageTransition from 'components/PageTransition'
import { Outlet, useParams } from 'react-router-dom'

const buttons = [
  {
    bgColor: '#fff',
    Icon: <UploadIcon />,
    color: '#000',
    text: 'Upload / Drop'
  },
  {
    bgColor: '#1F1E48',
    Icon: <AddIcon />,
    color: '#fff',
    text: 'Create folder'
  }
]

const WorkspaceLayout = () => {
  const { poolId } = useParams()

  return (
    <PageTransition>
      <Container>
        <Box width='100%' display='flex' flexDirection='column'>
          <Box
            display='flex'
            gap='15px'
            marginBottom={poolId ? '47px' : '66px'}
          >
            {buttons.map((button, index) => (
              <Box
                width='153px'
                height='88px'
                borderRadius='10px'
                backgroundColor={button.bgColor}
                display='flex'
                flexDirection='column'
                padding='13px'
                justifyContent='space-between'
                style={{ cursor: 'pointer' }}
              >
                {button.Icon}
                <Typography
                  fontWeight='500'
                  fontSize='15px'
                  lineHeight='22.5px'
                  color={button.color}
                >
                  {button.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Outlet />

          {/* <Box>
            <Link to=''>
              <Typography
                fontWeight='500'
                fontSize='12px'
                lineHeight='18px'
                color='#27E6D6'
                marginBottom='1.5px'
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {poolData?.name}
              </Typography>
            </Link>
            <Typography
              fontWeight='700'
              fontSize='22px'
              lineHeight='33px'
              color='#fff'
              marginBottom='19px'
            >
              File History
            </Typography>

            <HFDropzone handleDrop={handleDrop} disabled={!poolId} />
          </Box> */}
        </Box>
      </Container>
    </PageTransition>
  )
}

export default WorkspaceLayout
