/**
 * Created by vbabkin on 29.02.2016.
 */

/**
 * Функция достает значение в строке до * = [9]*Property16*Value11*2*6*Child1...2*3*6*Child2...
 * получает исходную строку = 9*Property16*Value11*2*6*Child1...2*3*6*Child2...
 * возвращает [значение; строку без этого означения] = 9;Property16*Value11*2*6*Child1...2*3*6*Child2...
 */
function trunc(sSrc) {

    var sVal = "";

    // очищаем исходную строку
    sSrc = sSrc.trim();

    // получаем позицию первой *
    var iPos = sSrc.indexOf("*");

    // нашли *
    if (iPos > -1)
    {

        // получаем значение
        sVal = sSrc.substr(0, iPos);

        // избавляемся от значения и * в исходной строке
        sSrc = sSrc.substr(iPos + 1);

    }
    else
    {
        sSrc = "";
    }

    // возвращаем полученное значение и исходную обрезанную строку
    // console.log("trunc=" + sVal);
    return [sVal,sSrc];
}

/**
 * Функция достает очередное значение из строки = [9*Property1]6*Value11*2*6*Child1...2*3*6*Child2...
 * получает исходную строку = 9*Property16*Value11*2*6*Child1...2*3*6*Child2...
 * возвращает [значение; строку без этого означения] = Property1; 6*Value11*2*6*Child1...2*3*6*Child2...
 */
function truncValue(sSrc, iLen)
{

    // очищаем исходную строку
    sSrc = sSrc.trim();


    // Если длину значения не передали, то ищем ее
    if (iLen === undefined)
    {
        // получаем длину значения
        var aRes = trunc(sSrc);
        iLen = aRes[0];
        sSrc = aRes[1];
    }

    if (iLen == "")
        iLen = 0;

    // получаем значение
    var sVal = sSrc.substr(0, iLen);

    // избавляемся от значения в исходной строке
    sSrc = sSrc.substr(iLen);


    // возвращаем полученное значение и исходную обрезанную строку
    //console.log("truncValue = " + sVal);
    return [sVal,sSrc];
}

