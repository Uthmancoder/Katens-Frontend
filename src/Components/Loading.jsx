import { SkeletonText, Box, SkeletonCircle, } from '@chakra-ui/react'
const Loading = () => {
    return (
        <div>
            <Box padding='6' boxShadow='lg' bg='#142030'>
                <div className='grid md:grid-cols-3 gap-6'>
                    <div className='col-span-2'>  <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='72' /></div>
                    <div className='col-span-2 md:col-span-1 border p-3  h-fit rounded-md border-slate-500 mt-5' >
                        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='12' />
                    </div>
                </div>
                <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='8' />
                <div className="grid-cols-2">
                <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='8' />
                <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='8' />    
                </div>
            </Box>
        </div>
    )
}

export default Loading