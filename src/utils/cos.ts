/** 获取 Cos 存储桶图像资源路径 */
export const getCosImageUrl = (src: string, width?: number, quality?: number) => `https://hammerwokshop-1316521854.cos.ap-shanghai.myqcloud.com/${src}?w=${width}&q=${quality}`