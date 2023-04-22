import React from "react";
import { Box, Card, CardBody, CardHeader, Center, Container, Divider, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import image_removebg_preview1 from "../../../../../assets/image-removebg-preview1.png"
import image_removebg_preview2 from "../../../../../assets/image-removebg-preview2.png"
import image_removebg_preview4 from "../../../../../assets/image-removebg-preview3.png"
import image_removebg_preview3 from "../../../../../assets/check-icon-1-removebg-preview3.png"


const CamKetBar = () => {
    return (
        <>
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                direction={"row"}
                spacing={0}
                mb={"20px"}
                mt={"20px"}
            >
                <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
                <Box
                    as={"button"}
                    borderRadius={"sm"}
                    borderWidth={"1px"}
                    borderColor={"brand.400"}
                    pointerEvents={"none"}
                    w={"200px"}
                    fontWeight={"medium"}
                >
                    <Text
                        color={"brand.400"}
                        shadow={"lg"}
                        fontSize={"xl"}
                    >
                        Cam kết
                    </Text>
                </Box>
                <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
            </Stack>
            <Container
                maxW='90%'
                mb={"30px"}
            >
                <Center>
                    <SimpleGrid
                        columns={4}
                        spacing='20px'
                    >
                        <Card w={"240px"} boxShadow={"none"} >
                            <Center>
                                <Image w={"100px"} src={image_removebg_preview1} alt="recommend" />
                            </Center>
                            <CardHeader fontWeight={"bold"}>
                                <Center>
                                    <Heading color={"brand.500"} fontSize={"lg"} >
                                        Thực đơn đa dạng
                                    </Heading>
                                </Center>
                            </CardHeader>
                            <CardBody>
                                <Center flexDirection={"column"} fontWeight={"medium"} fontSize={"sm"}>
                                    <Text>HFS thường xuyên</Text>
                                    <Text>thay đổi thực đơn đa dạng,</Text>
                                    <Text>linh hoạt, các món đặc sắc</Text>
                                    <Text>và dễ lựa chọn.</Text>
                                </Center>
                            </CardBody>
                        </Card>
                        <Card w={"240px"} boxShadow={"none"} >
                            <Center>
                                <Image w={"100px"} src={image_removebg_preview2} alt="recommend" />
                            </Center>
                            <CardHeader fontWeight={"bold"}>
                                <Center>
                                    <Heading color={"brand.500"} fontSize={"lg"} >
                                        Nguyên liệu sạch
                                    </Heading>
                                </Center>
                            </CardHeader>
                            <CardBody>
                                <Center flexDirection={"column"} fontWeight={"medium"} fontSize={"sm"}>
                                    <Text>Tất cả các loại nguyên liệu</Text>
                                    <Text>đều là thực phẩm sạch,</Text>
                                    <Text>chế biến đảm bảo vệ sinh</Text>
                                    <Text>an toàn thực phẩm.</Text>
                                </Center>
                            </CardBody>
                        </Card>
                        <Card w={"240px"} boxShadow={"none"} >
                            <Center>
                                <Image mb={"5px"} w={"100px"} src={image_removebg_preview3} alt="recommend" />
                            </Center>
                            <CardHeader fontWeight={"bold"}>
                                <Center>
                                    <Heading color={"brand.500"} fontSize={"lg"} >
                                        Khẩu phần ăn khoa học
                                    </Heading>
                                </Center>
                            </CardHeader>
                            <CardBody>
                                <Center flexDirection={"column"} fontWeight={"medium"} fontSize={"sm"}>
                                    <Text>Khẩu phần ăn được</Text>
                                    <Text>tính toán kỹ lưỡng lượng</Text>
                                    <Text>calories, đảm bảo chế độ</Text>
                                    <Text>ăn uống hợp lý.</Text>
                                </Center>
                            </CardBody>
                        </Card>
                        <Card w={"240px"} boxShadow={"none"} >
                            <Center>
                                <Image w={"100px"} src={image_removebg_preview4} alt="recommend" />
                            </Center>
                            <CardHeader fontWeight={"bold"}>
                                <Center>
                                    <Heading color={"brand.500"} fontSize={"lg"} >
                                        Giao hàng đúng giờ
                                    </Heading>
                                </Center>
                            </CardHeader>
                            <CardBody>
                                <Center flexDirection={"column"} fontWeight={"medium"} fontSize={"sm"}>
                                    <Text>Các phần ăn được</Text>
                                    <Text>chế biến nóng trong</Text>
                                    <Text>ngày, đảm bảo giao</Text>
                                    <Text>hàng đúng giờ, tận nơi.</Text>
                                </Center>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </Center>
            </Container>
        </>
    )
}

export default CamKetBar;