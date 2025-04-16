import React from 'react';

export const FilterContent = ({ onFilterApply, initialData }) => {
  const [filters, setFilters] = React.useState({
    collegeDept: '',
    yearGraduated: '',
    batch: '',
    role: ''
  });

  // Extract unique filter options
  const filterOptions = React.useMemo(() => {
    if (!initialData || initialData.length === 0) {
      return {
        collegeDepts: [],
        years: [],
        batches: [],
        roles: []
      };
    }

    return {
      collegeDepts: [...new Set(initialData.map(user => user.college_department))].filter(Boolean),
      years: [...new Set(initialData.map(user => user.year_graduated))].sort(),
      batches: [...new Set(initialData.map(user => user.batch))].filter(Boolean),
      roles: [...new Set(initialData.map(user => user.role))].filter(Boolean)
    };
  }, [initialData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = initialData.filter(user => {
      return (
        (!filters.collegeDept || user.college_department === filters.collegeDept) &&
        (!filters.yearGraduated || user.year_graduated.toString() === filters.yearGraduated) &&
        (!filters.batch || user.batch === filters.batch) &&
        (!filters.role || user.role === filters.role)
      );
    });
    onFilterApply(filtered);
  };

  const resetFilters = () => {
    setFilters({
      collegeDept: '',
      yearGraduated: '',
      batch: '',
      role: ''
    });
    onFilterApply(initialData);
  };

  return (
    <div className="container-fluid">
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">College Department</label>
          <select
            className="form-select"
            name="collegeDept"
            value={filters.collegeDept}
            onChange={handleFilterChange}
          >
            <option value="">All Departments</option>
            {filterOptions.collegeDepts.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Repeat similar structure for other filters */}
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">Year Graduated</label>
          <select
            className="form-select"
            name="yearGraduated"
            value={filters.yearGraduated}
            onChange={handleFilterChange}
          >
            <option value="">All Years</option>
            {filterOptions.years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">Batch</label>
          <select
            className="form-select"
            name="batch"
            value={filters.batch}
            onChange={handleFilterChange}
          >
            <option value="">All Batches</option>
            {filterOptions.batches.map(batch => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
          >
            <option value="">All Roles</option>
            {filterOptions.roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4 gap-2">
        <button className="btn btn-danger" onClick={resetFilters}>
          Reset
        </button>
        <button className="btn btn-success" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};