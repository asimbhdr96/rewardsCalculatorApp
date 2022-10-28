export const calculateReward = (amount) => {
  if (amount > 100) return 2 * (amount - 100) + 50;
  else if (amount > 50 && amount <= 100) return amount - 50;
  else return 0;
};



export const arrangeTransaction = (transactions) => {
  let customersData = {};

  transactions
    .map((data) => {
      const month = new Date(data.transactionDate).toLocaleString("default", {
        month: "short",
      });
      console.log(
        new Date(data.transactionDate).toLocaleTimeString("en-us", {
          timeZoneName: "short",
        })
      );
      const reward = calculateReward(data.transactionAmount);
      return { ...data, month, reward };
    })
    .forEach((customer) => {
      if (!customersData[customer.userId]) {
        customersData[customer.userId] = {
          userId: customer.userId,
          name: customer.name,
        };
      }
      if (!customersData[customer.userId]["rewardsPerMonth"]) {
        customersData[customer.userId]["rewardsPerMonth"] = [
          {
            month: customer.month,
            reward: customer.reward,
            transactionData: [
              {
                transactionId: customer.transactionId,
                dateOfTransfer: new Date(customer.transactionDate),
                amount: customer.transactionAmount,
                transactionReward: customer.reward,
              },
            ],
          },
        ];
      } else {
        if (
          customersData[customer.userId]["rewardsPerMonth"].find(
            (e) => e.month === customer.month
          )
        ) {
          customersData[customer.userId]["rewardsPerMonth"].filter((e) => {
            if (e.month === customer.month) {
              e.reward += customer.reward;
              e.transactionData.push({
                transactionId: customer.transactionId,
                dateOfTransfer: new Date(customer.transactionDate),
                amount: customer.transactionAmount,
                transactionReward: customer.reward,
              });
            }
          });
        } else {
          customersData[customer.userId]["rewardsPerMonth"].push({
            month: customer.month,
            reward: customer.reward,
            transactionData: [
              {
                transactionId: customer.transactionId,
                dateOfTransfer: new Date(customer.transactionDate),
                amount: customer.transactionAmount,
                transactionReward: customer.reward,
              },
            ],
          });
        }
      }

      if (!customersData[customer.userId]["totalRewards"]) {
        customersData[customer.userId]["totalRewards"] = customer.reward;
      } else {
        customersData[customer.userId]["totalRewards"] += customer.reward;
      }
    });

  return Object.values(customersData);
};
