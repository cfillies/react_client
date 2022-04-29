/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useRef} from 'react'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {AsideMenu} from './AsideMenu'
import {useDispatch, useSelector } from 'react-redux'
import { currentDocumentsNumber } from '../../../../features/filter/totalPagesSlice'
import { changeLoadingFiltersState, changeLoadingHorizontalFiltersState, changeState, setDistrict, setSearchState, updateChangeType } from '../../../../features/filter/filterObjectSlice'
import { reset } from '../../../../features/filter/counterSlice'

const AsideDefault: FC = () => {
  const {classes} = useLayout()
  const docsNumber = useSelector(currentDocumentsNumber)
  const selectionInputRef = useRef<HTMLSelectElement>(null);

  const dispatch = useDispatch();

  function submitHandler() {
    // console.log("submitHandler");
       

    if (null !== selectionInputRef.current) {
      const selectionDistrict = selectionInputRef.current.value;
      dispatch(setDistrict({newDistrict: selectionDistrict}))
      dispatch(reset())
      dispatch(updateChangeType({newChange:'filtering'}))
      dispatch(changeState())
      dispatch(setSearchState({searchingState:false}))
      dispatch(changeLoadingHorizontalFiltersState())
      dispatch(changeLoadingFiltersState())
    }
  }

  return (
    <div
      id='kt_aside'
      className={clsx('aside bg-white', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto bg-white' id='kt_aside_logo'>
        {/* begin::Logo */}
        {/* {<a href='#' className='text-gray-600 fw-bolder text-hover-primary fs-6'>
                Koepenick
          </a>} */}
          <div className='me-4' id="selection_menu_3"> 
            <select className="form-select" aria-label="Select example" ref={selectionInputRef} onClick={submitHandler}>
              {/* <option>Überall</option> */}
              <option value="charlottenburg">Charlottenburg-Wilmersdorf</option>
              <option value="koepenick">Köpenick</option>
              <option value="lichtenberg">Lichtenberg</option>
              <option value="mitte">Mitte</option>
              <option value="pankow">Pankow</option>
              <option value="metadata">Treptow</option>
              
            </select>
          </div>
        {/* end::Logo */}

      </div>
      <div className='flex-column-auto bg-white'
           style={{paddingLeft:"20px"}}
      
      >
        {/* begin::Logo */}
        {<span className='text-gray-600 fs-6'>
            {docsNumber} Dokumenten
          </span>}
        {/* end::Logo */}

      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

    </div>
  )
}

export {AsideDefault}
