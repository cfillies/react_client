/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react'
import AsideCheckBox2 from './AsideCheckBox2'
import { AsideFiltersCounterInterface, AsideMenuInterface } from '../../../../utils/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { asideFiltersConfigurations, changeLoadingFiltersState, currentChangeType, currentFilterCounter, currentLoadingFiltersState, searchConfigurations, updateFilterCounter } from '../../../../features/filter/filterObjectSlice'
import { InnerAsideMenuInterface } from '../../../../utils/interfaces'
import { fetchItemsWithPostMethodAsync } from '../../../../features/filter/documentsSlice'
import {ShowAsideItemHandler} from './ShowAsideItemHandler'

type PropsDocs = {
  listFieldName: string,
  asideDocuments: InnerAsideMenuInterface[]
}

export function AsideMenuMain() {
  const [loadedDocuments, setLoadedDocuments] = useState<AsideMenuInterface>({} as AsideMenuInterface);
  // const [docTypFilters, setDocTypFilters] = useState<InnerAsideMenuInterface[]>([] as InnerAsideMenuInterface[]);
  const asideItemConf = useSelector(asideFiltersConfigurations)
  const changeType = useSelector(currentChangeType)
  const currentFiltersChangeStatus = useSelector(currentLoadingFiltersState)
  const searchConf = useSelector(searchConfigurations)
  const filtersCounter = useSelector(currentFilterCounter)
  // const docTyp = useSelector(docTypFilterList);
  
  // const [loadedDocumentsCounter, setLoadedDocumentsCounter] = useState<number>(0);
  // const [itemsNumberToShow, setItemsNumberToShow] = useState<number>(3);

  // const muted = 'btn btn-sm btn-white btn-color-muted px-4 py-2'
  // const lightDanger = 'btn btn-sm btn-light btn-light-primary px-4 py-2'

  // const [buttonMerken, setButtonMerken] = useState(false)
  // const [buttonColor, setButtonColor] = useState(muted)

  // const toggleButtonHandler = () => {
  //   if (buttonMerken){
  //     setButtonMerken(false)
  //     setButtonColor(muted)
  //   }
  //   else {
  //     setButtonMerken(true)
  //     setButtonColor(lightDanger)
  //   }
  // }

  const dispatch = useDispatch()

  const updateFiltersHandler = async () => {

    if (changeType === 'searching' || changeType === 'asideItem' || changeType === 'filtering' || changeType === 'horizontalItem') {
      try {
        const t = await dispatch(fetchItemsWithPostMethodAsync({filterQuery: asideItemConf, searchQuery: searchConf}));

        let jsonResult = JSON.stringify(t);
        let objResult = JSON.parse(jsonResult);
        // console.log(objResult)
        setLoadedDocuments(objResult.payload);
        // setDocTypFilters(objResult.payload.doctype)
      } 
      catch (err) {
        console.error('Failed to save the post: ', err)
      } 
    }
    // else if (changeType === 'searching') {
    //   console.log('Searching')
    //   try {
    //     const t = await dispatch(searchFiltersAsync(searchConf));

    //     let jsonResult = JSON.stringify(t);
    //     let objResult = JSON.parse(jsonResult);
    //     setLoadedDocuments(objResult.payload);
    //     setIsLoading(false);
    //   } 
    //   catch (err) {
    //     console.error('Failed to save the post: ', err)
    //   } 
    // }
  }

  // const ShowAsideItemHandler: React.FC<Props> = ({document, fieldName, idx}) => { 

  //   return (
  //         <a 
  //           href="#"
  //           ref={React.createRef()}
  //           className={buttonColor}
  //           onClick={() => {
  //             dispatch(changeState())
  //             dispatch(changeLoadingFiltersState())
  //             let asideFilters = {} as typeof asideItemConf;
  //             let key: keyof AsideFiltersInterface;
  //             for (key in asideItemConf) {
  //               asideFilters[key] = [...asideItemConf[key]]
  //             }
  //             const fieldList = fieldName as keyof typeof asideItemConf;
  //             const value = document.value
  //             const index = asideFilters[fieldList].indexOf(value, 0);
  //             if (index > -1) {
  //               asideFilters[fieldList].splice(index, 1);
  //             }
  //             else {
  //               asideFilters[fieldList].push(value)
  //             }
  //             dispatch(reset())
  //             dispatch(changeLoadingHorizontalFiltersState())
  //             dispatch(setAsideItemConfiguration({updateAsideItemConfig:asideFilters}))
  //             dispatch(updateChangeType({newChange: 'asideItem'}))
  //             // dispatch(updateChangeType({newChange: 'horizontalItem'}))
  //             dispatch(setSearchState({searchingState:false}))
  //             toggleButtonHandler();
  //             }
  //           }
  //         >
  //           <AsideMenuItemWithSub
  //             to='/crafted/pages'
  //             title={document.value.concat(' (' + document.count.toString() + ')')}
  //             fontIcon='bi-archive'
  //           >
              
  //           </AsideMenuItemWithSub>
  //       </a> 
  //   )
  // }
    
  const ShowAsideElementsHandler: React.FC<PropsDocs> = ({asideDocuments, listFieldName}) => { 
    // const key = listFieldName as keyof typeof asideItemConf
    const filtersCounter = useSelector(currentFilterCounter)
    let newFiltersCounter = {...filtersCounter}
      return (
        <>
          {/* <ul>
            {asideDocuments?.map((doc, index) => (
              <ShowAsideItemHandler document={doc} idx={index} fieldName={listFieldName} key={index}/>
            ))}
          </ul> */}
          
          {
            // asideDocuments?.length > 3 &&
            <div className="accordion" id={"kt_accordion_1" + listFieldName}>
              <div className="accordion-item">
                <h2 className="accordion-header " id={"kt_accordion_1_header_1" + listFieldName}>
                    <button 
                      className={"accordion-button fs-7 fw-bold text-uppercase" + (filtersCounter[listFieldName as keyof AsideFiltersCounterInterface] > 0? "" : " collapsed")} 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={"#kt_accordion_1_body_1" + listFieldName} 
                      aria-expanded={filtersCounter[listFieldName as keyof AsideFiltersCounterInterface] > 0? "true" : "false"}
                      aria-controls={"kt_accordion_1_body_1" + listFieldName}
                      style={{paddingLeft:'50px'}}
                      onClick={() => {
                        
                          const filterCounterKey = listFieldName as keyof AsideFiltersCounterInterface
                          if (newFiltersCounter[filterCounterKey] > 0)
                            {
                            newFiltersCounter[filterCounterKey] = 0
                            dispatch(updateFilterCounter({filterCounter: newFiltersCounter}))
                          }
                        }
                      }
                    >
                      <span className="svg-icon svg-icon-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="black"/>
                        </svg>
                      </span>
                      {listFieldName === 'hidas' && 'Objektnummer' || listFieldName === 'path' && 'Ordner' || listFieldName === 'ext' && 'Endung' || listFieldName}
                    </button>
                </h2>
                <div id={"kt_accordion_1_body_1" + listFieldName} 
                  // className={"accordion-collapse collapse" + (asideItemConf[key].length?" show":"")}
                  className={"accordion-collapse collapse" + (filtersCounter[listFieldName as keyof AsideFiltersCounterInterface] > 0?" show":"")}
                  aria-labelledby={"kt_accordion_1_header_1" + listFieldName} 
                  data-bs-parent={"#kt_accordion_1" + listFieldName}>
                  <ul>
                    {asideDocuments?.map((doc, index) => (
                      <ShowAsideItemHandler document={doc} idx={index} fieldName={listFieldName} key={index}/> 
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          }
        </>
      );
  }

  if (currentFiltersChangeStatus){
    const newData = updateFiltersHandler();
    dispatch(changeLoadingFiltersState())
  }

  return (
    <>
      {/* <AsideCheckBox/> */}
      {/* <AsideCheckBox2/> */}


      {loadedDocuments.Denkmalart?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Denkmalart</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Denkmalart} listFieldName='Denkmalart'/>
      </>
      }

      {loadedDocuments.Denkmalname?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Denkmalname</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Denkmalname} listFieldName='Denkmalname'/>
      </>
      } 

      {loadedDocuments.hidas?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Hidas</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.hidas} listFieldName='hidas'/>
      </>
      }  

      {loadedDocuments.vorhaben?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Vorhaben</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.vorhaben} listFieldName='vorhaben'/>
      </>
      }

      {loadedDocuments.path?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Path</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.path} listFieldName='path'/>
      </>
      } 

      {loadedDocuments.ext?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Endung</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.ext} listFieldName='ext'/>
      </>
      } 
      
            
      {loadedDocuments.Sachbegriff?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Sachbegriff</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Sachbegriff} listFieldName='Sachbegriff'/>
      </>
      } 

      {loadedDocuments.Maßnahme?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Maßnahme</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Maßnahme} listFieldName='Maßnahme'/>
      </>
      }

      {loadedDocuments.Außenanlagen?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Außenanlagen</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Außenanlagen} listFieldName='Außenanlagen'/>
      </>
      }
      
      {loadedDocuments.Baumaßnahme?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Baumaßnahme</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Baumaßnahme} listFieldName='Baumaßnahme'/>
      </>
      } 

      {loadedDocuments.Bepflanzungen?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Bepflanzungen</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Bepflanzungen} listFieldName='Bepflanzungen'/>
      </>
      } 

      {loadedDocuments.Brandschutz?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Brandschutz} listFieldName='Brandschutz'/>
      </>
      } 

      {loadedDocuments.Dach?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Dach</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Dach} listFieldName='Dach'/>
      </>
      } 

      {loadedDocuments.Diverse?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Diverse</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Diverse} listFieldName='Diverse'/>
      </>
      } 

      {loadedDocuments.Eingangsbereich?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Eingangsbereich</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Eingangsbereich} listFieldName='Eingangsbereich'/>
      </>
      } 

      {loadedDocuments.Farbe?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Farbe</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Farbe} listFieldName='Farbe'/>
      </>
      } 

      {loadedDocuments.Fassade?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Fassade</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Fassade} listFieldName='Fassade'/>
      </>
      } 

      {loadedDocuments.Fenster?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Fenster} listFieldName='Fenster'/>
      </>
      } 

      {loadedDocuments.Funk?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Funk} listFieldName='Funk'/>
      </>
      } 

      {loadedDocuments.Gebäude?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Gebäude</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Gebäude} listFieldName='Gebäude'/>
      </>
      } 

      {loadedDocuments.Gebäudenutzung?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Gebäudenutzung</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Gebäudenutzung} listFieldName='Gebäudenutzung'/>
      </>
      } 

      {loadedDocuments.Haustechnik?.length > 0 && 
      <>
        {/* <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Haustechnik</span>
          </div>
        </div> */}
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Haustechnik} listFieldName='Haustechnik'/>
      </>
      } 

      {loadedDocuments.Kunst?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Kunst} listFieldName='Kunst'/>
      </>
      } 

      {loadedDocuments.Nutzungsänderung?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Nutzungsänderung} listFieldName='Nutzungsänderung'/>
      </>
      } 

      {loadedDocuments.Solaranlage?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Solaranlage} listFieldName='Solaranlage'/>
      </>
      } 

      {loadedDocuments.Treppenhaus?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Treppenhaus} listFieldName='Treppenhaus'/>
      </>
      } 

      {loadedDocuments.Tür?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Tür} listFieldName='Tür'/>
      </>
      } 

      {loadedDocuments.Werbeanlage?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.Werbeanlage} listFieldName='Werbeanlage'/>
      </>
      } 

      {loadedDocuments.district?.length > 0 && 
      <>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.district} listFieldName='district'/>
      </>
      } 

      {/* {loadedDocuments.doctype?.length > 0 && 
      <>
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>DocType</span>
          </div>
        </div>
        <ShowAsideElementsHandler asideDocuments={loadedDocuments.doctype} listFieldName='doctype'/>
      </>
      }  */}
    </>
  )
  
}
