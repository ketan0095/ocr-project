

def paddle_ocr(input, ocr):
    """
    input : cv2 image object 
    ocr : paddle ocr object 
    return : [string,center-y,rect-cord-of-string,center-x]
    """
    result = ocr.ocr(input)
    text_list = []
    for i in result[0]:
        try:
            text_list.append([i[1][0], i[0][0][1] + (i[0][2][1] - i[0][0][1])/2,
                              i[0][0] + i[0][2], i[0][0][0] + (i[0][2][0] - i[0][0][0])/2])
        except Exception as e:
            print("result :", i)
    return text_list
