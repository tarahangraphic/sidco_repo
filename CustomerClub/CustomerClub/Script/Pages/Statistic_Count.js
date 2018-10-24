$(document).ready(function () {
    $.ajax({
        type: "Get",
        url: "/Home/Stats",
        dataType: 'json',
        success: function (data) {
            console.log(data);

            NewOrders.innerHTML = data.StatsCount[0];
            BreakDownProducts.innerHTML = data.StatsCount[1];
            Suggestions.innerHTML = data.StatsCount[2];
            AgentRequests.innerHTML = data.StatsCount[3];
            InstallApps.innerHTML = data.StatsCount[4];
            GiftRequests.innerHTML = data.StatsCount[5];
            EnabledWarranty.innerHTML = data.StatsCount[6];

            ///////////////////////////////////////////////////////////////////
            stats_users_all.innerHTML = data.StatsUser[0];
            stats_users_female.innerHTML = data.StatsUser[1];
            stats_users_male.innerHTML = data.StatsUser[2];
            stats_users_type_customer.innerHTML = data.StatsUser[3];
            stats_users_type_mechanic.innerHTML = data.StatsUser[4];
            stats_users_type_agent.innerHTML = data.StatsUser[5];
            stats_users_agent_request.innerHTML = data.StatsUser[6];

            var sum1 = data.StatsUser[3] + data.StatsUser[4] + data.StatsUser[5];
            var c1data = {
                series: [
                    { value: data.StatsUser[3], className: 'c1' },
                    { value: data.StatsUser[4], className: 'c2' },
                    { value: data.StatsUser[5], className: 'c3' }
                ]
            };
            var pieChart1 = new Chartist.Pie('#ct-chart_user', c1data, {
                labelInterpolationFnc: function (value) {
                    var per1 = value / sum1 * 100;
                    return Math.round(per1 * 10) / 10 + '%';
                }
            });
            ///////////////////////////////////////////////////////////////////
            console.log(data.StatsOrder);
            stats_orders_all.innerHTML = data.StatsOrder[0];
            stats_orders_type_1.innerHTML = data.StatsOrder[1];
            stats_orders_type_2.innerHTML = data.StatsOrder[2];
            stats_orders_type_3.innerHTML = data.StatsOrder[3];

            var sum2 = data.StatsOrder[1] + data.StatsOrder[2] + data.StatsOrder[3];
            var c2data = {
                series: [
                    { value: data.StatsOrder[1], className: 'c1' },
                    { value: data.StatsOrder[2], className: 'c2' },
                    { value: data.StatsOrder[3], className: 'c3' }
                ]
            };
            var pieChart2 = new Chartist.Pie('#ct-chart_order', c2data, {
                labelInterpolationFnc: function (value) {
                    var per2 = value / sum2 * 100;
                    return Math.round(per2 * 10) / 10 + '%';
                }
            });
            ///////////////////////////////////////////////////////////////////
            console.log(data.StatsClub);
            stats_club_all.innerHTML = data.StatsClub[0];
            stats_club_type_1.innerHTML = data.StatsClub[1];
            stats_club_type_2.innerHTML = data.StatsClub[2];
            stats_club_type_3.innerHTML = data.StatsClub[3];
            stats_club_type_4.innerHTML = data.StatsClub[4];

            var sum3 = data.StatsClub[1] + data.StatsClub[2] + data.StatsClub[3] + data.StatsClub[4];
            var c3data = {
                series: [
                    { value: data.StatsClub[1], className: 'c1' },
                    { value: data.StatsClub[2], className: 'c2' },
                    { value: data.StatsClub[3], className: 'c3' },
                    { value: data.StatsClub[4], className: 'c4' }
                ]
            };
            var pieChart3 = new Chartist.Pie('#ct-chart_club', c3data, {
                labelInterpolationFnc: function (value) {
                    var per3 = value / sum3 * 100;
                    return Math.round(per3 * 10) / 10 + '%';
                }
            });
            ///////////////////////////////////////////////////////////////////
            console.log(data.StatsProductVerify);
            stats_product_verify_all.innerHTML = data.StatsProductVerify[0];
            stats_product_verify_state_1.innerHTML = data.StatsProductVerify[1];
            stats_product_verify_state_0.innerHTML = data.StatsProductVerify[2];
            stats_product_verify_breakdown.innerHTML = data.StatsProductVerify[3];

            var sum4 = data.StatsProductVerify[1] + data.StatsProductVerify[2];
            var c4data = {
                series: [
                    { value: data.StatsProductVerify[1], className: 'c1' },
                    { value: data.StatsProductVerify[2], className: 'c2' }
                ]
            };
            var pieChart4 = new Chartist.Pie('#ct-chart_product_verify', c4data, {
                labelInterpolationFnc: function (value) {
                    var per4 = value / sum4 * 100;
                    return Math.round(per4 * 10) / 10 + '%';
                }
            });
            ///////////////////////////////////////////////////////////////////
            console.log(data.StatsSuggestion);
            stats_suggestion_all.innerHTML = data.StatsSuggestion[0];
            stats_suggestion_state_1.innerHTML = data.StatsSuggestion[1];
            stats_suggestion_state_2.innerHTML = data.StatsSuggestion[2];
            stats_suggestion_state_3.innerHTML = data.StatsSuggestion[3];

            var sum5 = data.StatsSuggestion[1] + data.StatsSuggestion[2] + data.StatsSuggestion[3];
            var c5data = {
                series: [
                    { value: data.StatsSuggestion[1], className: 'c1' },
                    { value: data.StatsSuggestion[2], className: 'c2' },
                    { value: data.StatsSuggestion[3], className: 'c3' }
                ]
            };
            var pieChart5 = new Chartist.Pie('#ct-chart_suggestion', c5data, {
                labelInterpolationFnc: function (value) {
                    var per5 = value / sum5 * 100;
                    return Math.round(per5 * 10) / 10 + '%';
                }
            });
            ///////////////////////////////////////////////////////////////////
            console.log(data.StatsNotify);
            stats_notify_all.innerHTML = data.StatsNotify[0];
            stats_notify_public.innerHTML = data.StatsNotify[1];
            stats_notify_private.innerHTML = data.StatsNotify[2];

            var sum6 = data.StatsNotify[1] + data.StatsNotify[2];
            var c6data = {
                series: [
                    { value: data.StatsNotify[1], className: 'c1' },
                    { value: data.StatsNotify[2], className: 'c2' }
                ]
            };
            var pieChart6 = new Chartist.Pie('#ct-chart_notify', c6data, {
                labelInterpolationFnc: function (value) {
                    var per6 = value / sum6 * 100;
                    return Math.round(per6 * 10) / 10 + '%';
                }
            });
            ///////////////////////////////////////////////////////////////////
        }
    });
});