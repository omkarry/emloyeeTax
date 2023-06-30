import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FinancialYear } from '../../data/FinancialYear';
import useHttp from '../../config/https';

interface SlabDto {
  SlabNumber: number;
  PercentOfTax: number;
}

interface AddRegimeFormProps {
  onSubmit: (yearId: number, oldRegime: number, slabs: SlabDto[]) => void;
}

const AddRegimeForm = () => {
  const { axiosInstance, loading } = useHttp();

  const [yearId, setYearId] = useState<number>(0);
  const [oldRegime, setOldRegime] = useState<number | null>(null);
  const [slabs, setSlabs] = useState<SlabDto[]>([]);
  const [slabNumber, setSlabNumber] = useState<number>(0);
  const [percentOfTax, setPercentOfTax] = useState<number>(0);
  const [financialYears, setFinancialYears] = useState<FinancialYear[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setOldRegime(parseInt(value, 10));
  }

  const addCell = () => {

  }

  const handleAddSlab = () => {
    const newSlab: SlabDto = {
      SlabNumber: slabNumber,
      PercentOfTax: percentOfTax,
    };
    setSlabs([...slabs, newSlab]);
    setSlabNumber(0);
    setPercentOfTax(0);
  };

  const getFinancialYears = () => {
    axiosInstance.get(`FinancialYear/FinancialYears`)
      .then(response => {
        setFinancialYears(response.data.result);
      })
  }

  useEffect(() => {
    getFinancialYears();
  }, [])

  return (
    <div className='container mx-2'>
      <div className="row">
        <div className="h3">
          Add new Tax Regime
        </div>
      </div>
      <hr />
      <div className="row d-flex justify-content-between">
        <div className="col-md-3">
          <div className="col-md-6">
          <label htmlFor="oldRegime-dropdown" className="form-label">Old Regime </label>
            <select
              required
              id="oldRegime-dropdown"
              className="form-select"
              name="oldRegime"
              defaultValue="Select old regime"
              onChange={handleDropdownChange}
            >
              <option value="Select Old Regime" disabled>Select Old Regime</option>
              {financialYears && financialYears.map((item) => {
                return (
                  <option key={item.id} value={item.id} >
                    {item.financialYearStart}-{item.financialYearEnd}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-md-3 text-end">
            <div className='btn btn-outline-primary' onClick={addCell}>Add Slab</div>
        </div>
      </div>
    </div>
  );
};

export default AddRegimeForm;