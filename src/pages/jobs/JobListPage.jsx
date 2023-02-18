import { useEffect, useState } from 'react';
import { fetchJobs } from '../../api/job';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const JobListPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetchJobs();
      setJobs(res.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>로딩중..</div>;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">회사</TableCell>
          <TableCell align="center">직무</TableCell>
          <TableCell align="center">채용공고 링크</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jobs?.map(job => (
          <TableRow>
            <TableCell align="center">{job.company}</TableCell>
            <TableCell align="center">{job.position}</TableCell>
            <TableCell align="center">
              <a href={job.link} target="_blank">
                {job.link}
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
