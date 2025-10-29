import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { InvoicesContext } from "../../store/invoices-context";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import colors from "../../const/Colors";
import { useContext } from "react";
import Card from "../../components/UI/Card";

function DashBoard() {
  const invoiceCtx = useContext(InvoicesContext);
  function getMonthlyInvoiceTotals(invoices) {
    // Initialize an array with 12 elements set to 0, one for each month.
    const monthlyTotals = Array(12).fill(0);

    invoices.forEach((invoice) => {
      const invoiceDate = new Date(invoice.invoicedate); // Convert to Date object

      // Validate the date and balancedue fields
      if (isNaN(invoiceDate) || isNaN(Number(invoice.balancedue))) {
        console.warn("Skipping invalid invoice:", invoice);
        return;
      }

      const month = invoiceDate.getMonth(); // Extract month (0 = January, 11 = December)

      // Add balancedue for the corresponding month
      monthlyTotals[month] += Number(invoice.balancedue);
    });

    // Round totals and filter zeros for cleaner output
    return monthlyTotals.map((total) => (total ? Math.round(total) : 0));
  }
  const results = getMonthlyInvoiceTotals(invoiceCtx.invoices);
  function getMonthlyInvoiceCounts(invoices) {
    // Array of month names
    const monthNames = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    // Initialize an array to store counts for each month
    const monthlyCounts = Array(12).fill(0);

    // Iterate over invoices to calculate counts
    invoices.forEach((invoice) => {
      const invoiceDate = new Date(invoice.invoicedate); // Parse the date

      // Skip invalid dates
      if (isNaN(invoiceDate)) {
        console.warn("Skipping invalid invoice date:", invoice);
        return;
      }

      const month = invoiceDate.getMonth(); // Get the month (0-11)
      monthlyCounts[month] += 1; // Increment the count for the corresponding month
    });

    // Convert counts to the desired object format
    return monthlyCounts.map((count, index) => ({
      month: monthNames[index],
      count: count,
      key: monthNames[index],
    }));
  }

  const count = getMonthlyInvoiceCounts(invoiceCtx.invoices);
  console.log(count);
  const renderCount = ({ count }) => {
    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Invoice Issued Each Month</Text>
        <View style={styles.summaryDisplay}>
          <FlatList
            data={count}
            keyExtractor={(item, index) => index.toString()} // Use index if there's no unique key
            renderItem={(
              { item } // Correct destructuring
            ) => (
              <Card>
                <View>
                  <Text>{item.month}</Text>
                  <Text>{item.count}</Text>
                </View>
              </Card>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Value of Invoices issued each month</Text>
        <LineChart
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                data: results,
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={320}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: colors.bluelight1,
            backgroundGradientFrom: colors.bluelight1,
            backgroundGradientTo: colors.bluelight3,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 8,
              padding: 10,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Invoice Issued each month</Text>
        <View style={styles.summaryDisplay}>
          <FlatList
            data={count}
            horizontal={true}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => {
              return (
                <Card>
                  <View style={styles.display}>
                    <Text style={styles.displayText}>{item.month}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.displayText}>{item.count}</Text>
                  </View>
                </Card>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: colors.white,
    height: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  summaryContainer: {
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  summaryDisplay: {
    flexDirection: "row",
  },
  display: {
    backgroundColor:colors.bluelight1,
    padding: 10,
  },
  displayText: {
   padding:5,
    color: colors.white,
    fontSize:15
  },
});
export default DashBoard;
