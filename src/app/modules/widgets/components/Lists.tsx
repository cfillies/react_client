import {FC, useState} from 'react'
import {
  ListsWidget7,
} from '../../../../_metronic/partials/widgets'

import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentsWithPostMethodAsync } from '../../../../features/filter/documentsSlice'
import { currentSearchState, changeState, currentState, currentChangeType, searchConfigurations, asideFiltersConfigurations } from '../../../../features/filter/filterObjectSlice'
import { setTotalPagesNumber } from '../../../../features/filter/totalPagesSlice'
import {currentPageSize} from '../../../../features/filter/counterSlice'
import { totalPages } from '../../../../features/filter/totalPagesSlice'
import {fetchStatus} from '../../../../features/filter/documentsSlice'
import { BlockUI } from '../../../../utils/BlockUI'

interface DocumentsInterface {
  id: number,
  file: string,
  path: string,
  doctype: string,
  adresse: string[],
  hidas: string[],
  Denkmalart: string[],
  doc_image: string,
  vorhaben: string,
  summary: string
}


const Lists: FC = () => {

  const dispatch = useDispatch()
  const currentSearchingStatus = useSelector(currentSearchState)
  const currentChangeStatus = useSelector(currentState)
  const changeType = useSelector(currentChangeType)
  const searchConf = useSelector(searchConfigurations)
  const asideItemConf = useSelector(asideFiltersConfigurations)
  const thisPageSize = useSelector(currentPageSize)
  const currentTotalPages =  useSelector(totalPages);

  const [loadedDocuments, setLoadedDocuments] = useState<DocumentsInterface[]>([]);


  const updateDocumentsListHandler = async () => {
    if (changeType === 'filtering' && !currentSearchingStatus) {
      try {
        // const t = await dispatch(fetchDocumentsAsync(updatedFilter));
        const t = await dispatch(fetchDocumentsWithPostMethodAsync({filterQuery: asideItemConf, searchQuery: {
          "field": "",
          "search": ""
        }}));
        let jsonResult = JSON.stringify(t);
        let objResult = JSON.parse(jsonResult);
        // console.log(objResult.payload);

        // const totalNumberOfDocs = objResult.payload[objResult.payload.length - 1]["totalNumberOfDocuments"]
        const totalNumberOfDocs = objResult.payload.count
        dispatch(setTotalPagesNumber({docsNumber: totalNumberOfDocs, pageSize: thisPageSize}))

        const doc_list = [];
        for (const key in objResult.payload.metadata) {
          const doc = {
            id: key,
            ...objResult.payload.metadata[key]
          };
          let newSummary = ""
          for (const summaryKey in doc["summary"]) {
            // console.log(doc["summary"][summaryKey])
            newSummary += doc["summary"][summaryKey] + " ";
          }
          doc["summary"] = null;
          doc["summary"] = newSummary
          doc_list.push(doc);
        }
        setLoadedDocuments(doc_list);
      } 
      catch (err) {
        console.error('Failed to load documents: ', err)
      } 
    }
   
    else if ((changeType === 'searching' || changeType === 'asideItem' || changeType === 'newPage' || changeType === 'horizontalItem' )) {
      
      try {
        // const t = await dispatch(fetchItemFieldAsync({filterQuery: asideItemConf, searchQuery: searchConf}));
        const t = await dispatch(fetchDocumentsWithPostMethodAsync({filterQuery: asideItemConf, searchQuery: searchConf}));

        let jsonResult = JSON.stringify(t);
        let objResult = JSON.parse(jsonResult);

        const totalNumberOfDocs = objResult.payload.count
        dispatch(setTotalPagesNumber({docsNumber: totalNumberOfDocs, pageSize: thisPageSize}))

        const doc_list = [];
        for (const key in objResult.payload.metadata) {
          const doc = {
            id: key,
            ...objResult.payload.metadata[key]
          };
          let newSummary = ""
          for (const summaryKey in doc["summary"]) {
            // console.log(doc["summary"][summaryKey])
            newSummary += doc["summary"][summaryKey] + " ";
          }
          doc["summary"] = null;
          doc["summary"] = newSummary
          doc_list.push(doc);
        }
        setLoadedDocuments(doc_list);
      } 
      catch (err) {
        console.error('Failed to fetch documents: ', err)
      } 
    }
  }

  

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     'http://localhost:5000/record/'
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const doc_list = [];

  //       for (const key in data) {
  //         const doc = {
  //           id: key,
  //           ...data[key]
  //         };

  //         doc_list.push(doc);
  //       }

  //       // console.log(doc_list)
  //       setIsLoading(false);
  //       setLoadedDocuments(doc_list);
  //       dispatch(changeState())
  //     });
  // }, []);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }

  
  if (currentChangeStatus){
    const newData = updateDocumentsListHandler();
    dispatch(changeState())
  }

  const currentDocLoadingStatus = useSelector(fetchStatus)
  const loadingStatus = currentDocLoadingStatus === "loading" 

  return (
    <>
      {
        (currentTotalPages === 0 && 
        <div className="card card-custom">
          <div className="card-header">
              <h3 className="card-title text-warning">Information</h3>
          </div>
        <div className="card-body">
          <h2>
            Keine Dokumente zum Vorzeigen
          </h2>
        </div>

      </div>)

        ||
        <ListsWidget7 className='card-xl-stretch mb-xl-8' 
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-height='auto'
                    data-kt-scroll-wrappers='#kt_aside_menu'
                    data-kt-scroll-offset='0'
                    docs={loadedDocuments}
        />
      }
      <BlockUI blocking={loadingStatus} title="Wird geladen"/> 
    </>
  )
}

export {Lists}
