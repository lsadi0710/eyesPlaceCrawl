module.exports = {
    searchPlaceList: async (keyword, businessType) => {
        if(!(
            businessType == "hairshop" || 
            businessType == "place" || 
            businessType == "nailshop" || 
            businessType == "restaurant") ||
            keyword == ""
        ){
            throw new Error("입력값이 잘못 되었습니다.");
        }

        /**
         * 생성된 Debug Chrome Browser 에 GraphQL 요청을 전송합니다.
         * @param {Page} _page | Puppeteer 의 Page 객체를 전달합니다. (graphQL 요청 매개체)
         * @param {String} _type | 검색 타입을 지정합니다. [1: place, 2:hairShop, 3:nailShop, 4:restaurant]
         * @param {String} _search_keyword | 검색어를 지정합니다.
         * @param {Number} _display | 검색할 갯수를 지정합니다. (페이징 처리)
         * @param {Number} _start | 검색 시작점을 지정합니다. (페이징 처리)
         * @return {void} | 요청만 보냅니다. 응답은 이벤트리스너로 받습니다.
         */
        const callGraphQL = (_page, _type, _search_keyword, _display, _start) => {
            let query = "";
            switch(_type){
                case "place": // PLACE
                    query = getPlaceQuery(_search_keyword, _display, _start);
                    break;
                case "hairshop": // HairShop
                    query = getHairshopQuery(_search_keyword, _display, _start);
                    break;
                case "nailshop": // NailShop
                    query = getNailshopQuery(_search_keyword, _display, _start);
                    break;
                case "restaurant": // Restaurant
                    query = getRestaurantQuery(_search_keyword, _display, _start);
                    break;
            }
            _page.evaluate( (query) => {
                fetch('https://pcmap-api.place.naver.com/graphql', {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: query
                }).then((response) => { response.json(); });
            }, query);
        }


        let getPlaceQuery = (keyword, display, start ) => {
            return JSON.stringify([
                {
                    "operationName": "getPlacesList",
                    "variables": {
                        "useReverseGeocode": true,
                        "input": {
                            "query": keyword,
                            "start": start,
                            "display": display,
                            "adult": false,
                            "spq": false,
                            "queryRank": "",
                            "x": "126.97825",
                            "y": "37.566551",
                            "deviceType": "pcmap"
                        },
                        "isNmap": true,
                        "isBounds": true,
                        "reverseGeocodingInput": {}
                    },
                    "query": "query getPlacesList($input: PlacesInput, $isNmap: Boolean!, $isBounds: Boolean!, $reverseGeocodingInput: ReverseGeocodingInput, $useReverseGeocode: Boolean = false) {\n  businesses: places(input: $input) {\n    total\n    items {\n      id\n      name\n      normalizedName\n      category\n      detailCid {\n        c0\n        c1\n        c2\n        c3\n        __typename\n      }\n      categoryCodeList\n      dbType\n      distance\n      roadAddress\n      address\n      fullAddress\n      commonAddress\n      bookingUrl\n      phone\n      virtualPhone\n      businessHours\n      daysOff\n      imageUrl\n      imageCount\n      x\n      y\n      poiInfo {\n        polyline {\n          shapeKey {\n            id\n            name\n            version\n            __typename\n          }\n          boundary {\n            minX\n            minY\n            maxX\n            maxY\n            __typename\n          }\n          details {\n            totalDistance\n            arrivalAddress\n            departureAddress\n            __typename\n          }\n          __typename\n        }\n        polygon {\n          shapeKey {\n            id\n            name\n            version\n            __typename\n          }\n          boundary {\n            minX\n            minY\n            maxX\n            maxY\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      subwayId\n      markerId @include(if: $isNmap)\n      markerLabel @include(if: $isNmap) {\n        text\n        style\n        stylePreset\n        __typename\n      }\n      imageMarker @include(if: $isNmap) {\n        marker\n        markerSelected\n        __typename\n      }\n      oilPrice @include(if: $isNmap) {\n        gasoline\n        diesel\n        lpg\n        __typename\n      }\n      isPublicGas\n      isDelivery\n      isTableOrder\n      isPreOrder\n      isTakeOut\n      isCvsDelivery\n      hasBooking\n      naverBookingCategory\n      bookingDisplayName\n      bookingBusinessId\n      bookingVisitId\n      bookingPickupId\n      baemin {\n        businessHours {\n          deliveryTime {\n            start\n            end\n            __typename\n          }\n          closeDate {\n            start\n            end\n            __typename\n          }\n          temporaryCloseDate {\n            start\n            end\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      yogiyo {\n        businessHours {\n          actualDeliveryTime {\n            start\n            end\n            __typename\n          }\n          bizHours {\n            start\n            end\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      isPollingStation\n      hasNPay\n      talktalkUrl\n      visitorReviewCount\n      visitorReviewScore\n      blogCafeReviewCount\n      bookingReviewCount\n      streetPanorama {\n        id\n        pan\n        tilt\n        lat\n        lon\n        __typename\n      }\n      naverBookingHubId\n      bookingHubUrl\n      bookingHubButtonName\n      newOpening\n      newBusinessHours {\n        status\n        description\n        dayOff\n        dayOffDescription\n        __typename\n      }\n      coupon {\n        total\n        promotions {\n          promotionSeq\n          couponSeq\n          conditionType\n          image {\n            url\n            __typename\n          }\n          title\n          description\n          type\n          couponUseType\n          __typename\n        }\n        __typename\n      }\n      mid\n      hasMobilePhoneNumber\n      hiking {\n        distance\n        startName\n        endName\n        __typename\n      }\n      __typename\n    }\n    optionsForMap @include(if: $isBounds) {\n      ...OptionsForMap\n      displayCorrectAnswer\n      correctAnswerPlaceId\n      __typename\n    }\n    searchGuide {\n      queryResults {\n        regions {\n          displayTitle\n          query\n          region {\n            rcode\n            __typename\n          }\n          __typename\n        }\n        isBusinessName\n        __typename\n      }\n      queryIndex\n      types\n      __typename\n    }\n    queryString\n    siteSort\n    __typename\n  }\n  reverseGeocodingAddr(input: $reverseGeocodingInput) @include(if: $useReverseGeocode) {\n    ...ReverseGeocodingAddr\n    __typename\n  }\n}\n\nfragment OptionsForMap on OptionsForMap {\n  maxZoom\n  minZoom\n  includeMyLocation\n  maxIncludePoiCount\n  center\n  spotId\n  keepMapBounds\n  __typename\n}\n\nfragment ReverseGeocodingAddr on ReverseGeocodingResult {\n  rcode\n  region\n  __typename\n}"
                }
            ]);
        };

        let getHairshopQuery = (keyword, display, start) => {
            return JSON.stringify([
                {
                    "operationName": "getBeautyList",
                    "variables": {
                        "useReverseGeocode": true,
                        "input": {
                            "query": keyword,
                            "display": display,
                            "start": start,
                            "filterBooking": false,
                            "filterCoupon": false,
                            "naverBenefit": false,
                            "sortingOrder": "precision",
                            "deviceType": "pcmap"
                        },
                        "businessType": "hairshop",
                        "isNmap": true,
                        "isBounds": true,
                        "reverseGeocodingInput": {}
                    },
                    "query": "query getBeautyList($input: BeautyListInput, $businessType: String, $isNmap: Boolean!, $isBounds: Boolean!, $reverseGeocodingInput: ReverseGeocodingInput, $useReverseGeocode: Boolean = false) {\n  businesses: hairshops(input: $input) {\n    total\n    userGender\n    items {\n      ...BeautyBusinessItems\n      imageMarker @include(if: $isNmap) {\n        marker\n        markerSelected\n        __typename\n      }\n      markerId @include(if: $isNmap)\n      markerLabel @include(if: $isNmap) {\n        text\n        style\n        __typename\n      }\n      __typename\n    }\n    nlu {\n      ...NluFields\n      __typename\n    }\n    optionsForMap @include(if: $isBounds) {\n      ...OptionsForMap\n      __typename\n    }\n    __typename\n  }\n  brands: beautyBrands(input: $input, businessType: $businessType) {\n    name\n    cid\n    __typename\n  }\n  reverseGeocodingAddr(input: $reverseGeocodingInput) @include(if: $useReverseGeocode) {\n    ...ReverseGeocodingAddr\n    __typename\n  }\n}\n\nfragment NluFields on Nlu {\n  queryType\n  user {\n    gender\n    __typename\n  }\n  queryResult {\n    ptn0\n    ptn1\n    region\n    spot\n    tradeName\n    service\n    selectedRegion {\n      name\n      index\n      x\n      y\n      __typename\n    }\n    selectedRegionIndex\n    otherRegions {\n      name\n      index\n      __typename\n    }\n    property\n    keyword\n    queryType\n    nluQuery\n    businessType\n    cid\n    branch\n    forYou\n    franchise\n    titleKeyword\n    location {\n      x\n      y\n      default\n      longitude\n      latitude\n      dong\n      si\n      __typename\n    }\n    noRegionQuery\n    priority\n    showLocationBarFlag\n    themeId\n    filterBooking\n    repRegion\n    repSpot\n    dbQuery {\n      isDefault\n      name\n      type\n      getType\n      useFilter\n      hasComponents\n      __typename\n    }\n    type\n    category\n    menu\n    context\n    __typename\n  }\n  __typename\n}\n\nfragment ReverseGeocodingAddr on ReverseGeocodingResult {\n  rcode\n  region\n  __typename\n}\n\nfragment OptionsForMap on OptionsForMap {\n  maxZoom\n  minZoom\n  includeMyLocation\n  maxIncludePoiCount\n  center\n  spotId\n  keepMapBounds\n  __typename\n}\n\nfragment CouponItems on Coupon {\n  total\n  promotions {\n    promotionSeq\n    couponSeq\n    conditionType\n    image {\n      url\n      __typename\n    }\n    title\n    description\n    type\n    couponUseType\n    __typename\n  }\n  __typename\n}\n\nfragment BeautyBusinessItemBase on BeautySummary {\n  id\n  apolloCacheId\n  name\n  hasBooking\n  hasNPay\n  blogCafeReviewCount\n  bookingReviewCount\n  bookingReviewScore\n  description\n  roadAddress\n  address\n  imageUrl\n  talktalkUrl\n  distance\n  x\n  y\n  representativePrice {\n    isFiltered\n    priceName\n    price\n    __typename\n  }\n  promotionTitle\n  stylesCount\n  visitorReviewCount\n  visitorReviewScore\n  styleBookingCounts {\n    styleNum\n    name\n    count\n    isPopular\n    __typename\n  }\n  newOpening\n  coupon {\n    ...CouponItems\n    __typename\n  }\n  __typename\n}\n\nfragment BeautyBusinessItems on BeautySummary {\n  ...BeautyBusinessItemBase\n  styles {\n    desc\n    shortDesc\n    styleNum\n    isPopular\n    images {\n      imageUrl\n      __typename\n    }\n    styleOptions {\n      num\n      __typename\n    }\n    __typename\n  }\n  streetPanorama {\n    id\n    pan\n    tilt\n    lat\n    lon\n    __typename\n  }\n  __typename\n}"
                }
            ]);
        };

        let getNailshopQuery = (keyword, display, start) => {
            return JSON.stringify([
                
            ]);
        };

        let getRestaurantQuery = (keyword, display, start) => {
            return JSON.stringify([

            ]);
        };

        let delay = () => {
            return new Promise(function(resolve) { 
                setInterval(() => {
                    if(flag)
                        resolve();
                }, 1)
            });
        }

        const puppeteer = require('puppeteer');
        
        let flag = false;
        let currentIdx = 0;
        let placeItem = [];
        
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        
        const responseBodies = {};
        // 요청 수집
        page.on('response', async (response) => {
            const url = response.url();
            if (url.includes('https://pcmap-api.place.naver.com/graphql') && response.request().method() !== 'OPTIONS') { // AJAX 요청 필터링
                try {
                    const body = await response.text(); // 응답 본문 가져오기
                    if(JSON.parse(body)[0].data.businesses.items.length >= 1){
                        console.log("receive_data");
                        if(currentIdx === 0)
                            responseBodies[currentIdx] = JSON.parse(body)[0].data.businesses; // URL을 키로 하고 응답 본문을 값으로 저장
                        else
                            placeItem.push(...JSON.parse(body)[0].data.businesses.items); // URL을 키로 하고 응답 본문을 값으로 저장
                        console.log(currentIdx + " OK.", JSON.parse(body)[0].data.businesses.items.map(e => e.name).length);
                        flag = true;
                    }
                } catch (error) {
                    console.error(`Error fetching body for ${url}:`, error);
                }
            }
        });
        try{
            await page.goto(`https://pcmap.place.naver.com/${businessType}/list?query=${keyword}&x=126&y=37&clientX=126&clientY=37&bounds=126%3B37%3B127%3B37`); // 실제 URL로 변경
        }catch(e){
            console.log("[ERROR]", "접속에 실패했습니다.", businessType, keyword);
            await browser.close();
            throw new Error("작업에 실패했습니다.");
        }
        
        
        // 페이지가 로드되고 AJAX 요청을 처리하는 동안 대기
        await page.waitForFunction('document.readyState === "complete"');
        
        await (async () => {
            return new Promise(async (resolve) => {
                // 전체 개수 구해오기
                callGraphQL(page, businessType, keyword, 1, 1);
                await delay();
                let totalListItem = responseBodies[0].total;
                let collectedItem = 0;
                console.log("[LOG] 검색에 성공했습니다. 총 ", totalListItem, "개 검색됨.(최대 300개 수집), ", parseInt(totalListItem/70), "회 검색");
                totalListItem = totalListItem > 300 ? 300 : totalListItem;
        
                for(let i=1; i<=parseInt(totalListItem/70)+1; i++){
                    currentIdx = i;
                    let collectItemCnt = (collectedItem + 70) > 300 ? 300 - collectedItem : 70;
                    console.log("SEARCH ",collectItemCnt ,collectedItem +1)
                    callGraphQL(page, businessType, keyword, collectItemCnt ,collectedItem +1);
                    flag = false;
        
                    await delay();
                    collectedItem += collectItemCnt;
                    console.log("OK_RECEIVED", collectedItem);
                }
                resolve();
            });
        })();
        
        // AJAX 요청 출력
        let rank = 1;
        let result = [];

        placeItem.forEach( e => {
            result.push({
                placeId: e.id,
                blogCafeReviewCount: e.blogCafeReviewCount,
                rank: rank++,
                bookingReviewCount: e.bookingReviewCount,
                bookingReviewScore: e.bookingReviewScore,
                name: e.name,
                visitorReviewCount: e.visitorReviewCount,
                visitorReviewScore: e.visitorReviewScore
            })
        })
        await browser.close();

        return result;
    }
}
