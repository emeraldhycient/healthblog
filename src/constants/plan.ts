import { Plan } from "@src/types";

export const planOptions = [
    {
      key: 'basic',
      planKey: 'PLN_eu02',
      plan: {
        name: 'Monthly',
        key: 'monthly',
        pricing: {
          monthly: {
            amount: 900,
          },
          quarterly: {
            amount: 2500,
          },
          semi_annually: {
            amount: 5000,
          },
          annually: {
            amount: 10700,
          },
        },
        benefits: [
            'Access to All Features',
            '1k lookups / per month',
            '30k API Credits / month',
            '60 minutes Monitoring interval',
            'Ip Monitoring',
            '20% discount on backorders',
        ],
      },
    },
    {
        key: 'quarterly',
        planKey: 'PLN_eu02',
        plan: {
          name: 'Quarterly',
          key: 'quarterly',
          pricing: {
            monthly: {
              amount: 1200,
            },
            quarterly: {
              amount: 3000,
            },
            semi_annually: {
              amount: 7000,
            },
            annually: {
              amount: 11700,
            },
          },
          benefits: [
              'Access to All Features',
              '1k lookups / per month',
              '30k API Credits / month',
              '60 minutes Monitoring interval',
              'Ip Monitoring',
              '20% discount on backorders',
          ],
        },
    },
    {
        key: 'advanced',
        planKey: 'PLN_eu02',
        plan: {
          name: 'SemiAnnually',
          key: 'semiAnnually',
          pricing: {
            monthly: {
              amount: 2000,
            },
            quarterly: {
              amount: 4500,
            },
            semi_annually: {
              amount: 9000,
            },
            annually: {
              amount: 15700,
            },
          },
          benefits: [
              'Access to All Features',
              '1k lookups / per month',
              '30k API Credits / month',
              '60 minutes Monitoring interval',
              'Ip Monitoring',
              '20% discount on backorders',
          ],
        },
    },
    {
        key: 'advanced',
        planKey: 'PLN_eu02',
        plan: {
          name: 'Annually',
          key: 'annually',
          pricing: {
            monthly: {
              amount: 2000,
            },
            quarterly: {
              amount: 4500,
            },
            semi_annually: {
              amount: 9000,
            },
            annually: {
              amount: 15700,
            },
          },
          benefits: [
              'Access to All Features',
              '1k lookups / per month',
              '30k API Credits / month',
              '60 minutes Monitoring interval',
              'Ip Monitoring',
              '20% discount on backorders',
          ],
        },
    },
  ]  as {
    key: string;
    planKey?: string;
    plan: Plan;
  }[];