import moment from 'moment';

interface TeamMate {
  associateId: string;
  first_name: string;
  last_name: string;
  department: string;
  travelStatus: string;
  personalStatus: string;
  wfh: string;
  latest_date: string;
  accountName: string;
}

export const mapLatestTeamDetails = (teamList: any) => {
  return teamList.map((teamMate: TeamMate) => {
    return {
      employeeId: teamMate.associateId || '',
      fullName: `${teamMate.first_name} ${teamMate.last_name}` || '',
      latestDate: moment(teamMate.latest_date).format('DD-MMM-YYYY') || '',
      MISDepartment: teamMate.department || '',
      workLocation: teamMate.wfh === 'No' ? 'Client Site' : 'Work from home',
      personalStatus: teamMate.personalStatus,
      travelStatus: teamMate.travelStatus,
      accountName: teamMate.accountName,
    };
  });
};

interface teamLocation {
  wfh: string;
  clientSite: string;
  cbp: string;
  businessTrip: string;
}

export const mapTeamLocation = (teamData: teamLocation) => {
  return [
    {
      color: '#FECD56',
      title: 'Work from home',
      value: +teamData.wfh || 0,
    },
    {
      color: '#FF6283',
      title: 'Client Site',
      value: +teamData.clientSite || 0,
    },
    {
      color: '#FF9F41',
      title: 'Changi Business Park',
      value: +teamData.cbp || 0,
    },
    {
      color: '#4DBFC0',
      title: 'Business Travel',
      value: +teamData.businessTrip || 0,
    },
  ];
};

interface teamStatus {
  noStatus: string;
  confirmedCase: string;
  suspectedCase: string;
  SHN: string;
  LOA: string;
  EPM: string;
}

export const mapTeamStatus = (teamData: teamStatus) => {
  return [
    {
      color: '#FECD56',
      title: 'No Status',
      value: +teamData.noStatus || 0,
    },
    {
      color: '#FF6283',
      title: 'Confirmed Case',
      value: +teamData.confirmedCase || 0,
    },
    {
      color: '#FF9F41',
      title: 'Suspected Case',
      value: +teamData.suspectedCase || 0,
    },
    {
      color: '#4DBFC0',
      title: 'Stay-Home Notice',
      value: +teamData.SHN || 0,
    },
    {
      color: '#37A3EB',
      title: 'Leave of Absence',
      value: +teamData.LOA || 0,
    },
    {
      color: '#A54FFB',
      title: 'Extra Precautionary Measure',
      value: teamData.EPM || 0,
    },
  ];
};
